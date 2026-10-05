// cli.mjs: the command's behaviour: where `ternts build` writes, what an incremental build
// rewrites, flags, exit codes and messages, source maps, and the npm command's WebAssembly
// fallback (js/cli.cjs with TERNTS_CLI=wasm) giving the native binary's output.
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, tmpdir, walk, run, wasmState, Results } from './lib.mjs';

function write(dir, files) {
  for (const [f, text] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(dir, f)), { recursive: true });
    fs.writeFileSync(path.join(dir, f), text);
  }
}

// A small project: src/ with a nested directory, a spec file, an interface imported by a class.
const PROJECT = {
  'src/main.ts': 'import { Api } from "./api";\nimport { Shape } from "./shape";\nexport const s: Shape = { x: 1 };\nexport const a = new Api();\nexport { Shape };\n',
  'src/api.ts': 'export class Api { get(): number { return 1; } }\n',
  'src/shape.ts': 'export interface Shape { x: number }\n',
  'src/deep/util.ts': 'export const twice = (n: number) => n * 2;\n',
  'src/main.spec.ts': 'import { a } from "./main";\nexport const t = a;\n',
};

const js = (dir) => walk(dir).filter((f) => f.endsWith('.js')).sort();
const mtime = (f) => fs.statSync(f).mtimeMs;

export async function runCli({ bin }) {
  const res = new Results('cli');
  const tmp = tmpdir('cli');
  const fresh = (name, files = PROJECT) => { const d = path.join(tmp, name); write(d, files); return d; };
  const tn = (args, opts = {}) => run(bin, args, opts);
  const show = (r) => `  exit ${r.status}\n  stdout: ${r.stdout.slice(0, 400)}\n  stderr: ${r.stderr.slice(0, 400)}`;

  // build SRC OUT: OUT/<path under SRC>
  {
    const d = fresh('src-out');
    const r = tn(['build', 'src', 'dist'], { cwd: d });
    res.check('build src dist', r.status === 0 && js(path.join(d, 'dist')).join(' ') === 'api.js deep/util.js main.js main.spec.js shape.js', () => show(r) + `\n  dist: ${js(path.join(d, 'dist')).join(' ')}`);
  }
  // build . OUT: OUT/src/... (cda6e61: it wrote OUTrc/...)
  {
    const d = fresh('dot');
    const r = tn(['build', '.', 'out'], { cwd: d });
    const dirs = fs.readdirSync(d).sort().join(' ');
    res.check('build . out', r.status === 0 && fs.existsSync(path.join(d, 'out', 'src', 'main.js')) && dirs === 'out src', () => show(r) + `\n  entries: ${dirs}`);
  }
  // build with absolute paths
  {
    const d = fresh('abs');
    const r = tn(['build', path.join(d, 'src'), path.join(d, 'lib')]);
    res.check('build ABS_SRC ABS_OUT', r.status === 0 && fs.existsSync(path.join(d, 'lib', 'deep', 'util.js')), () => show(r));
  }
  // build -p: rootDir/outDir from the tsconfig; include/exclude
  {
    const d = fresh('tsconfig', { ...PROJECT, 'tsconfig.json': JSON.stringify({ compilerOptions: { rootDir: 'src', outDir: 'build', module: 'commonjs', target: 'es2022' }, include: ['src'], exclude: ['**/*.spec.ts'] }) });
    const r = tn(['build', '-p', 'tsconfig.json'], { cwd: d });
    res.check('build -p (rootDir, outDir, exclude)', r.status === 0 && js(path.join(d, 'build')).join(' ') === 'api.js deep/util.js main.js shape.js', () => show(r) + `\n  build: ${js(path.join(d, 'build')).join(' ')}`);
    const r2 = tn(['build'], { cwd: d });
    res.check('build (./tsconfig.json by default)', r2.status === 0, () => show(r2));
  }
  // no rootDir: the common directory of the files, as tsc
  {
    const d = fresh('noroot', { ...PROJECT, 'tsconfig.json': JSON.stringify({ compilerOptions: { outDir: 'dist', module: 'commonjs', target: 'es2022' }, include: ['src'] }) });
    const r = tn(['build', '-p', 'tsconfig.json'], { cwd: d });
    res.check('build -p without rootDir', r.status === 0 && fs.existsSync(path.join(d, 'dist', 'main.js')), () => show(r) + `\n  dist: ${js(path.join(d, 'dist')).join(' ')}`);
  }
  // noEmit without SRC OUT: an error, not a silent no-op
  {
    const d = fresh('noemit', { ...PROJECT, 'tsconfig.json': JSON.stringify({ compilerOptions: { noEmit: true, module: 'commonjs', target: 'es2022' } }) });
    const r = tn(['build', '-p', 'tsconfig.json'], { cwd: d });
    res.check('build -p with noEmit fails', r.status !== 0 && /noEmit/.test(r.stderr), () => show(r));
  }
  // --no-spec
  {
    const d = fresh('nospec');
    const r = tn(['build', 'src', 'dist', '--no-spec'], { cwd: d });
    res.check('--no-spec', r.status === 0 && !fs.existsSync(path.join(d, 'dist', 'main.spec.js')) && fs.existsSync(path.join(d, 'dist', 'main.js')), () => show(r));
  }
  // incremental: only the changed file is rewritten; --force rewrites all; a deleted source's
  // output goes; a type that becomes a class rebuilds its importers (the import is kept now)
  {
    const d = fresh('incr');
    tn(['build', 'src', 'dist'], { cwd: d });
    const outs = js(path.join(d, 'dist')).map((f) => path.join(d, 'dist', f));
    // sources a minute old, outputs half a minute old: then edit one source
    const age = () => {
      const now = Date.now() / 1000;
      for (const f of walk(path.join(d, 'src'))) fs.utimesSync(path.join(d, 'src', f), now - 60, now - 60);
      for (const o of outs) if (fs.existsSync(o)) fs.utimesSync(o, now - 30, now - 30);
      return (now - 25) * 1000;
    };
    let cut = age();
    fs.writeFileSync(path.join(d, 'src', 'deep', 'util.ts'), 'export const twice = (n: number) => n * 3;\n');
    const r = tn(['build', 'src', 'dist'], { cwd: d });
    const changed = outs.filter((o) => mtime(o) > cut).map((o) => path.relative(path.join(d, 'dist'), o));
    res.check('incremental: only the edited file', r.status === 0 && changed.join(' ') === 'deep/util.js' && fs.readFileSync(path.join(d, 'dist', 'deep', 'util.js'), 'utf8').includes('n * 3'), () => show(r) + `\n  rewritten: ${changed.join(' ')}`);
    cut = age();
    const r2 = tn(['build', 'src', 'dist', '--force'], { cwd: d });
    res.check('--force rewrites every file', r2.status === 0 && outs.every((o) => mtime(o) > cut), () => show(r2));
    cut = age();
    const r2b = tn(['build', 'src', 'dist'], { cwd: d });
    res.check('nothing changed: nothing rewritten', r2b.status === 0 && outs.every((o) => mtime(o) < cut), () => show(r2b));
    fs.rmSync(path.join(d, 'src', 'deep', 'util.ts'));
    const r3 = tn(['build', 'src', 'dist'], { cwd: d });
    res.check('a deleted source\'s output is removed', r3.status === 0 && !fs.existsSync(path.join(d, 'dist', 'deep', 'util.js')), () => show(r3));
    const before = fs.readFileSync(path.join(d, 'dist', 'main.js'), 'utf8');
    age();
    fs.writeFileSync(path.join(d, 'src', 'shape.ts'), 'export class Shape { x = 1 }\n');
    const r4 = tn(['build', 'src', 'dist'], { cwd: d });
    const after = fs.readFileSync(path.join(d, 'dist', 'main.js'), 'utf8');
    res.check('interface -> class rebuilds its importer', r4.status === 0 && !before.includes('./shape') && after.includes('./shape'), () => show(r4) + `\n  main.js after:\n${after}`);
  }
  // --sourcemap: a .js.map beside each output, linked from it, naming the source
  {
    const d = fresh('maps');
    const r = tn(['build', 'src', 'dist', '--sourcemap'], { cwd: d });
    let ok = r.status === 0, why = '';
    try {
      const map = JSON.parse(fs.readFileSync(path.join(d, 'dist', 'main.js.map'), 'utf8'));
      const code = fs.readFileSync(path.join(d, 'dist', 'main.js'), 'utf8');
      ok = ok && map.version === 3 && map.sources.length === 1 && map.sources[0].endsWith('main.ts') && map.mappings.length > 0 && /\/\/# sourceMappingURL=main\.js\.map\s*$/.test(code);
      why = JSON.stringify(map).slice(0, 300);
    } catch (e) { ok = false; why = e.message; }
    res.check('--sourcemap', ok, () => show(r) + '\n  ' + why);
    const m = run(process.execPath, [path.join(ROOT, 'harness', 'mapcheck.mjs'), path.join(d, 'dist')]);
    res.check('--sourcemap maps words to their source (mapcheck)', m.status === 0 && !/wrong|bad|mismatch/i.test(m.stdout), () => show(m));
  }
  // one file: stdout, or OUT
  {
    const d = fresh('single');
    const r = tn([path.join('src', 'api.ts')], { cwd: d });
    res.check('ternts IN.ts prints JavaScript', r.status === 0 && r.stdout.includes('class Api') && r.stdout.includes('exports.Api'), () => show(r));
    const r2 = tn([path.join('src', 'api.ts'), 'api.js'], { cwd: d });
    res.check('ternts IN.ts OUT.js writes it', r2.status === 0 && fs.readFileSync(path.join(d, 'api.js'), 'utf8').trimEnd() === r.stdout.trimEnd(), () => show(r2));
    const r3 = tn([path.join('src', 'api.ts'), '--esm'], { cwd: d });
    res.check('--esm', r3.status === 0 && r3.stdout.includes('export class Api'), () => show(r3));
  }
  // errors: a syntax error names the file and line and exits 1; the build writes nothing for it
  {
    const d = fresh('errors', { 'src/ok.ts': 'export const ok = 1;\n', 'src/bad.ts': 'export const x = ;\n' });
    const r = tn([path.join('src', 'bad.ts')], { cwd: d });
    res.check('syntax error: exit 1, file:line', r.status === 1 && /bad\.ts:1:/.test(r.stderr), () => show(r));
    const r2 = tn(['build', 'src', 'dist'], { cwd: d });
    res.check('build with a syntax error: nonzero exit, names the file', r2.status !== 0 && /bad\.ts:1/.test(r2.stderr), () => show(r2));
    const r3 = tn(['missing.ts'], { cwd: d });
    res.check('a missing input file: nonzero exit and a message', r3.status !== 0 && r3.stderr.length > 0, () => show(r3));
    const r4 = tn(['build', 'nope', 'dist'], { cwd: d });
    res.check('build of a missing SRC directory: nonzero exit and a message', r4.status !== 0 && r4.stderr.length > 0, () => show(r4));
  }
  // the npm command's WebAssembly fallback: the same files, byte for byte
  {
    const state = wasmState('ternts-cli.wasm');
    if (state) res.skip('wasm fallback (TERNTS_CLI=wasm)', `js/ternts-cli.wasm is ${state}: run with --build-wasm`);
    else {
      const d = fresh('wasm', { ...PROJECT, 'tsconfig.json': JSON.stringify({ compilerOptions: { rootDir: 'src', outDir: 'native', module: 'commonjs', target: 'es2022', experimentalDecorators: true, emitDecoratorMetadata: true } }) });
      write(d, { 'src/dec.ts': 'function D(): any {}\n@D() export class C { constructor(a: string) {} }\n' });
      const r1 = tn(['build', '-p', 'tsconfig.json'], { cwd: d });
      const r2 = run(process.execPath, [path.join(ROOT, 'js', 'cli.cjs'), 'build', 'src', 'wasm', '-p', 'tsconfig.json'], { cwd: d, env: { ...process.env, TERNTS_CLI: 'wasm' } });
      const a = js(path.join(d, 'native')), b = js(path.join(d, 'wasm'));
      const same = a.length > 0 && a.join() === b.join() && a.every((f) => fs.readFileSync(path.join(d, 'native', f), 'utf8') === fs.readFileSync(path.join(d, 'wasm', f), 'utf8'));
      res.check('wasm fallback gives the native output', r1.status === 0 && r2.status === 0 && same, () => show(r1) + '\n' + show(r2) + `\n  native: ${a.join(' ')}\n  wasm: ${b.join(' ')}`);
      const r3 = run(process.execPath, [path.join(ROOT, 'js', 'cli.cjs'), 'src/bad-missing.ts'], { cwd: d, env: { ...process.env, TERNTS_CLI: 'wasm' } });
      const r4 = tn(['src/bad-missing.ts'], { cwd: d });
      res.check('wasm fallback: same exit code as native', r3.status === r4.status, () => show(r3) + '\n' + show(r4));
    }
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  return res;
}
