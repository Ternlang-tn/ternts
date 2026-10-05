// npm/build.mjs [--version X.Y.Z] [--skip-linux] [--platforms a,b] [--no-main] [--no-pgo]
// Builds and packs the ternts package and the @ternlang/ternts-<os>-<cpu> binary packages into npm/out/.
// Needs tern, the wasm toolchain, and Docker for the Linux builds.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');
const OUT = path.join(HERE, 'out');
const args = process.argv.slice(2);
const opt = (name, d) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : d; };
const version = opt('--version', JSON.parse(fs.readFileSync(path.join(HERE, 'package.json'), 'utf8')).version);
const skipLinux = args.includes('--skip-linux');
const only = opt('--platforms', '').split(',').filter((x) => x);
const noMain = args.includes('--no-main');
const noPgo = args.includes('--no-pgo');

const PLATFORMS = [
  { name: 'darwin-arm64', os: 'darwin', cpu: 'arm64', target: null },        // native
  { name: 'darwin-x64', os: 'darwin', cpu: 'x64', target: 'macos-x86_64' },
  { name: 'linux-arm64', os: 'linux', cpu: 'arm64', target: 'linux-static', linux: true },
  { name: 'linux-x64', os: 'linux', cpu: 'x64', target: 'linux-static-x86_64', linux: true },
];

const run = (cmd, argv, cwd = ROOT) => execFileSync(cmd, argv, { cwd, stdio: 'inherit' });
const write = (p, text) => { fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, text); };
const json = (o) => JSON.stringify(o, null, 2) + '\n';

fs.rmSync(OUT, { recursive: true, force: true });
const base = JSON.parse(fs.readFileSync(path.join(HERE, 'package.json'), 'utf8'));
const built = [];

// PGO: train an instrumented build on the Nest corpus from bench/setup.sh (skipped by --no-pgo or no corpus).
const macProfile = noPgo || !PLATFORMS.some((p) => !p.linux && (only.length === 0 || only.includes(p.name))) ? '' : trainProfile();
function trainProfile() {
  const corpus = path.join(ROOT, 'bench/corpus/nest');
  if (!fs.existsSync(corpus)) { console.log('note: no bench/corpus (bench/setup.sh): building without PGO'); return ''; }
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ternts-pgo-'));
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.name === 'node_modules' ? [] : e.isDirectory() ? walk(path.join(d, e.name)) : /\.(ts|tsx|mts|cts)$/.test(e.name) && !e.name.endsWith('.d.ts') ? [path.join(d, e.name)] : []);
  // real code at the default target only, so rarely used lowering paths don't look hot
  const files = walk(corpus);
  fs.writeFileSync(path.join(tmp, 'list'), files.join('\n') + '\n');
  console.log(`PGO: training on ${files.length} files...`);
  run('tern', ['build', '--profile-generate', 'main.tn', '-o', path.join(tmp, 'gen')]);
  const env = { ...process.env, LLVM_PROFILE_FILE: path.join(tmp, '%p.profraw') };
  execFileSync(path.join(tmp, 'gen'), ['--bench', '3', '@' + path.join(tmp, 'list')], { env, stdio: 'ignore' });
  execFileSync(path.join(tmp, 'gen'), ['build', path.join(corpus, 'packages'), path.join(tmp, 'out'), '--force'], { env, stdio: 'ignore', cwd: corpus });
  const raws = fs.readdirSync(tmp).filter((f) => f.endsWith('.profraw')).map((f) => path.join(tmp, f));
  const prof = path.join(OUT, 'ternts.profdata');
  fs.mkdirSync(OUT, { recursive: true });
  const pd = process.platform === 'darwin' ? ['xcrun', ['llvm-profdata']] : ['llvm-profdata', []];
  execFileSync(pd[0], [...pd[1], 'merge', '-o', prof, ...raws], { stdio: 'inherit' });
  return prof;
}
// Linux builds use an older clang in Docker that can't read the Mac profile, so train in that image.
function trainLinux(p) {
  const corpus = path.join(ROOT, 'bench/corpus/nest');
  if (noPgo || !fs.existsSync(corpus)) return '';
  const arch = p.cpu === 'x64' ? 'amd64' : 'arm64';
  const image = `tern-linux-musl-${arch}`;
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), `ternts-pgo-${p.name}-`));
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.name === 'node_modules' ? [] : e.isDirectory() ? walk(path.join(d, e.name)) : /\.(ts|tsx|mts|cts)$/.test(e.name) && !e.name.endsWith('.d.ts') ? [path.join(d, e.name)] : []);
  fs.writeFileSync(path.join(tmp, 'list'), walk(corpus).join('\n') + '\n');
  const gen = path.join(tmp, 'gen');
  const prof = path.join(OUT, `ternts-${p.name}.profdata`);
  try {
    run('tern', ['build', '--target', p.target, '--profile-generate', 'main.tn', '-o', gen]);
    const mounts = ['/Users', '/private', '/var/folders', '/tmp'].filter((m) => fs.existsSync(m)).flatMap((m) => ['-v', `${m}:${m}`]);
    const sh = `LLVM_PROFILE_FILE=${tmp}/%p.profraw ${gen} --bench 2 @${tmp}/list >/dev/null && ` +
      `/usr/lib/llvm17/bin/llvm-profdata merge -o ${prof} ${tmp}/*.profraw`;
    console.log(`PGO: training ${p.name} in ${image}...`);
    execFileSync('docker', ['run', '--rm', '--platform', `linux/${arch}`, ...mounts, image, 'sh', '-c', sh], { stdio: 'inherit' });
    return fs.existsSync(prof) ? prof : '';
  } catch (e) {
    console.log(`note: ${p.name}: couldn't train a profile (${e.message.split('\n')[0]}); building without PGO ` +
      `(an image from before compiler-rt/llvm17 were added: docker rmi ${image})`);
    return '';
  }
}

for (const p of PLATFORMS) {
  if ((p.linux && skipLinux) || (only.length > 0 && !only.includes(p.name))) continue;
  const dir = path.join(OUT, p.name);
  const exe = path.join(dir, 'ternts');
  fs.mkdirSync(dir, { recursive: true });
  const targ = p.target ? ['--target', p.target] : [];
  const profile = p.linux ? trainLinux(p) : macProfile;
  console.log(`building ${p.name}...`);
  if (profile) {
    try { run('tern', ['build', ...targ, '--profile-use', profile, 'main.tn', '-o', exe]); }
    catch { console.log(`note: ${p.name}: its toolchain can't use the profile; building without PGO`); run('tern', ['build', ...targ, 'main.tn', '-o', exe]); }
  } else {
    run('tern', ['build', ...targ, 'main.tn', '-o', exe]);
  }
  if ((fs.statSync(exe).mode & 0o111) === 0) fs.chmodSync(exe, 0o755);   // (Docker-built ones are root's, already executable)
  write(path.join(dir, 'package.json'), json({
    name: `@ternlang/ternts-${p.name}`, version, description: `The ternts binary for ${p.os} ${p.cpu}.`,
    license: base.license, repository: base.repository, os: [p.os], cpu: [p.cpu],
    files: ['ternts'], preferUnplugged: true,
  }));
  write(path.join(dir, 'README.md'), `The \`ternts\` binary for ${p.os}-${p.cpu}. Install [@ternlang/ternts](https://www.npmjs.com/package/@ternlang/ternts) instead; npm picks this package for you.\n`);
  built.push(p.name);
}

if (!noMain) {
  // the wasm engine the per-file hooks use (the loader tern writes isn't needed)
  console.log('building ternts.wasm...');
  run('tern', ['build', '--lib', '--target', 'wasm', 'wasm.tn', '-o', 'js/ternts.wasm']);
  for (const f of ['js/ternts.mjs', 'js/ternts.d.ts']) fs.rmSync(path.join(ROOT, f), { force: true });

  // the command for platforms without a native binary, run by cli.cjs under Node's WASI
  console.log('building ternts-cli.wasm...');
  run('tern', ['build', '--target', 'wasm', 'wasi.tn', '-o', 'js/ternts-cli.wasm']);

  const main = path.join(OUT, 'ternts');
  fs.mkdirSync(path.join(main, 'js'), { recursive: true });
  for (const f of fs.readdirSync(path.join(ROOT, 'js'))) {
    if (/\.(cjs|mjs|js|wasm|d\.ts)$/.test(f)) fs.copyFileSync(path.join(ROOT, 'js', f), path.join(main, 'js', f));
  }
  fs.chmodSync(path.join(main, 'js', 'cli.cjs'), 0o755);
  fs.copyFileSync(path.join(ROOT, 'README.md'), path.join(main, 'README.md'));
  for (const lic of ['LICENSE', 'LICENSE-MIT', 'LICENSE-APACHE']) {
    if (fs.existsSync(path.join(ROOT, lic))) fs.copyFileSync(path.join(ROOT, lic), path.join(main, lic));
  }
  const exportsMap = {
    '.': './js/index.cjs', './jest': './js/jest.cjs', './vite': { import: './js/vite-plugin-ternts.mjs' },
    './register': './js/register.mjs', './client': './js/client.cjs', './wasm': './js/wasm.cjs',
    './package.json': './package.json',
  };
  const pkg = { ...base, version, main: './js/index.cjs', bin: { ternts: 'js/cli.cjs' }, exports: exportsMap,
    files: ['js', 'README.md', 'LICENSE*'],
    optionalDependencies: Object.fromEntries(PLATFORMS.map((p) => [`@ternlang/ternts-${p.name}`, version])) };
  write(path.join(main, 'package.json'), json(pkg));

}

for (const d of noMain ? built : [...built, 'ternts']) run('npm', ['pack', '--pack-destination', OUT, '--silent'], path.join(OUT, d));
console.log(`\nnpm/out: ${fs.readdirSync(OUT).filter((f) => f.endsWith('.tgz')).join(', ')}`);
