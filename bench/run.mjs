// run.mjs: the README's speed tables, measured on this machine. Run bench/setup.sh first.
//   node bench/run.mjs [--corpus nest|vscode] [--reps N]
import fs from 'fs';
import os from 'os';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const B = path.dirname(fileURLToPath(import.meta.url));
const R = path.join(B, '..');
const H = path.join(R, 'harness');
const OUT = path.join(B, 'out');
const TERNTS = path.join(R, 'ternts');
const SWC = path.join(H, 'node_modules/.bin/swc');
const TSC5 = path.join(H, 'node_modules/ts5/bin/tsc');
const TSGO = (() => {  // tsgo's native binary, not the node wrapper around it
  const d = path.join(H, 'node_modules/@typescript');
  const p = fs.existsSync(d) && fs.readdirSync(d).find(n => n.startsWith('typescript-'));
  return p ? path.join(d, p, 'lib/tsc') : null;
})();

const argv = process.argv.slice(2);
const opt = (name, dflt) => { const k = argv.indexOf(name); return k >= 0 ? argv[k + 1] : dflt; };
const only = opt('--corpus', null);
const repsArg = opt('--reps', null);

for (const [what, p] of [['ternts', TERNTS], ['harness/node_modules', SWC], ['tsgo', TSGO], ['corpus', path.join(B, 'corpus/nest')]])
  if (!p || !fs.existsSync(p)) { console.error(`missing ${what}: run bench/setup.sh first`); process.exit(1); }

const CORPORA = [
  { key: 'nest', name: 'NestJS repo', dir: 'corpus/nest', build: 'corpus/nest/packages', buildName: 'Nest packages', reps: 5 },
  { key: 'vscode', name: 'VS Code', dir: 'corpus/vscode', build: 'corpus/vscode', buildName: 'VS Code', reps: 3 },
].filter(c => !only || c.key === only);

// Every .ts file that isn't a declaration file or under node_modules, in a stable order.
function tsFiles(dir) {
  return fs.readdirSync(dir, { recursive: true })
    .filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts') && !f.split(path.sep).includes('node_modules'))
    .map(f => path.join(dir, f))
    .filter(f => fs.statSync(f).isFile())
    .sort();
}

function run(cmd, args, env = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', env: { ...process.env, ...env }, maxBuffer: 1 << 28 });
  if (r.error) throw r.error;
  return r;
}

// Best wall-clock ms over `reps` runs of a command (after one warm-up run).
function wall(reps, cmd, args) {
  run(cmd, args);
  let best = Infinity;
  for (let i = 0; i < reps; i++) {
    const t0 = performance.now();
    run(cmd, args);
    best = Math.min(best, performance.now() - t0);
  }
  return best;
}

// ternts --bench and harness/tsbase.mjs print: tool, files, bytes in, bytes out, failed, ms, MB/s
function inproc(r) {
  const f = r.stdout.trim().split('\n').pop().split('\t');
  if (f.length < 6) throw new Error(`unexpected output: ${r.stdout}${r.stderr}`);
  return { ms: parseFloat(f[5]), fails: parseInt(f[4]) };
}

function tsconfig(file, files, rootDir, outDir, module) {
  fs.writeFileSync(file, JSON.stringify({
    compilerOptions: {
      module, target: 'es2023', experimentalDecorators: true, emitDecoratorMetadata: true,
      useDefineForClassFields: false, removeComments: true, noCheck: true, noResolve: true, noLib: true,
      types: [], isolatedModules: true, skipLibCheck: true, noEmitOnError: false, sourceMap: false,
      declaration: false, incremental: false, rootDir, outDir,
    }, files,
  }, null, 1));
  return file;
}

const countJs = dir => fs.existsSync(dir) ? fs.readdirSync(dir, { recursive: true }).filter(f => f.endsWith('.js')).length : 0;
const ms = x => x >= 1000 ? `${(x / 1000).toFixed(2)} s` : `${Math.round(x)} ms`;
const mb = n => `${(n / 1e6).toFixed(1)} MB`;
const log = s => process.stderr.write(s + '\n');

fs.mkdirSync(OUT, { recursive: true });
const single = {}, builds = {}, notes = [];

for (const c of CORPORA) {
  const reps = +(repsArg || c.reps);
  const dir = path.join(B, c.dir), bdir = path.join(B, c.build);

  // Table 1: in-process, one thread, CommonJS
  const files = tsFiles(dir);
  const bytes = files.reduce((n, f) => n + fs.statSync(f).size, 0);
  const list = path.join(OUT, `${c.key}.files.txt`);
  fs.writeFileSync(list, files.join('\n') + '\n');
  log(`${c.name}: ${files.length} files, ${mb(bytes)}, best of ${reps}`);
  const s = single[c.key] = { files: files.length, bytes, rows: {} };
  log('  ternts --bench'); s.rows.ternts = inproc(run(TERNTS, ['--bench', String(reps), '@' + list]));
  log('  swc transformSync'); s.rows.swc = inproc(run('node', [path.join(H, 'tsbase.mjs'), 'swc', list], { REPS: String(reps) }));
  log('  tsc 5.9 transpileModule'); s.rows.tsc = inproc(run('node', [path.join(H, 'tsbase.mjs'), 'tsc', list], { REPS: String(reps) }));
  log('  tsgo --singleThreaded');
  const o1 = path.join(OUT, `${c.key}.tsgo1`);
  s.rows.tsgo = { ms: wall(reps, TSGO, ['-p', tsconfig(path.join(OUT, `${c.key}.tsgo1.json`), files, dir, o1, 'commonjs'), '--singleThreaded']) };
  s.rows.tsgo.outs = countJs(o1);

  // Table 2: whole builds, all cores, ES modules, rewriting every output
  const bfiles = tsFiles(bdir);
  const b = builds[c.key] = { name: c.buildName, files: bfiles.length, rows: {} };
  const o = tool => path.join(OUT, `${c.key}.build.${tool}`);
  log(`${c.buildName}: builds of ${bfiles.length} files`);
  log('  ternts build'); b.rows.ternts = { ms: wall(reps, TERNTS, ['build', bdir, o('ternts'), '--esm', '--force']) };
  b.rows.ternts.nochange = wall(reps, TERNTS, ['build', bdir, o('ternts'), '--esm']);
  log('  tsgo'); b.rows.tsgo = { ms: wall(reps, TSGO, ['-p', tsconfig(path.join(OUT, `${c.key}.build.json`), bfiles, bdir, o('tsgo'), 'esnext')]) };
  log('  swc CLI'); b.rows.swc = { ms: wall(reps, SWC, [bdir, '-d', o('swc'), '--config-file', path.join(B, 'swcrc.json'), '--strip-leading-paths', '--extensions', '.ts', '--ignore', '**/*.d.ts,**/node_modules/**']) };
  log('  tsc 5.9');  // VS Code needs more than Node's default 4 GB heap
  b.rows.tsc = { ms: wall(reps, 'node', ['--max-old-space-size=16384', TSC5, '-p', path.join(OUT, `${c.key}.build.json`), '--outDir', o('tsc')]) };
  for (const t of Object.keys(b.rows)) {
    b.rows[t].outs = countJs(o(t));
    if (b.rows[t].outs < 0.95 * bfiles.length) b.rows[t].failed = true;  // a crash, not a time
  }
}

const keys = Object.keys(single);
const cell = (row, base) => row.failed ? `failed (${row.outs} files written)` : row.ms === Infinity || isNaN(row.ms) ? '' :
  row === base ? `**${ms(row.ms)}**` : `${ms(row.ms)} (${(row.ms / base.ms).toFixed(1)}x)` + (row.fails ? `, ${row.fails} files fail` : '');
const table = (head, groups, labels) => {
  let t = `| | ${head.join(' | ')} |\n|---|${head.map(() => '---|').join('')}\n`;
  for (const [k, label] of labels) t += `| ${label} | ${groups.map(g => cell(g.rows[k], g.rows.ternts)).join(' | ')} |\n`;
  return t;
};
const ver = p => JSON.parse(fs.readFileSync(path.join(H, 'node_modules', p, 'package.json'), 'utf8')).version;
const sha = d => run('git', ['-C', path.join(B, 'corpus', d), 'rev-parse', '--short', 'HEAD']).stdout.trim();

let md = `${os.cpus()[0].model}, ${os.cpus().length} cores, ${os.platform()} ${os.release()}, Node ${process.version}.\n`;
md += `swc ${ver('@swc/core')} (CLI ${ver('@swc/cli')}), tsc ${ver('ts5')}, tsgo ${ver('typescript')}. `;
md += keys.map(k => `${k} @ ${sha(k)}`).join(', ') + '.\n\n';
md += 'Transpiling in-process, one thread, best of N, CommonJS (tsgo: a whole `--noCheck --singleThreaded` run, including process start and writing):\n\n';
md += table(keys.map(k => `${CORPORA.find(c => c.key === k).name} (${single[k].files.toLocaleString('en')} files, ${mb(single[k].bytes)})`),
  keys.map(k => single[k]),
  [['ternts', '**ternts**'], ['swc', 'swc (`@swc/core` `transformSync`)'], ['tsc', 'tsc 5.9 `transpileModule`'], ['tsgo', 'tsgo `--noCheck --singleThreaded`']]);
md += '\nWhole builds from the command line, all cores, ES modules, including process start and rewriting every output:\n\n';
md += table(keys.map(k => `${builds[k].name} (${builds[k].files.toLocaleString('en')} files)`),
  keys.map(k => builds[k]),
  [['ternts', '**ternts build**'], ['tsgo', 'tsgo `--noCheck`'], ['swc', 'swc CLI'], ['tsc', 'tsc 5.9 `--noCheck`']]);
md += '\n' + keys.map(k => `${builds[k].name}: rebuild with nothing changed ${ms(builds[k].rows.ternts.nochange)}; outputs written: ` +
  Object.entries(builds[k].rows).map(([t, r]) => `${t} ${r.outs}`).join(', ') + '.').join('\n') + '\n';

fs.writeFileSync(path.join(OUT, 'results.md'), md);
console.log(md);
