// dev.mjs: edit-to-reload time on NestJS's cats sample, ternts dev vs the Nest CLI's watch modes.
//   node bench/dev.mjs [--rounds N]
import fs from 'fs';
import path from 'path';
import { spawn, spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const B = path.dirname(fileURLToPath(import.meta.url));
const TERNTS = path.join(B, '..', 'ternts');
const SAMPLE = path.join(B, 'corpus/nest/sample/01-cats-app');
const APP = path.join(B, 'out/dev-app');
const PORT = 3000;
const argv = process.argv.slice(2);
const ROUNDS = +(argv[argv.indexOf('--rounds') + 1] || 0) || 10;
const log = s => process.stderr.write(s + '\n');

if (!fs.existsSync(SAMPLE) || !fs.existsSync(TERNTS)) { log('run bench/setup.sh first'); process.exit(1); }

// The sample needs --legacy-peer-deps upstream; swc is added for `nest start -b swc`.
if (!fs.existsSync(path.join(APP, 'node_modules/.bin/nest'))) {
  log('installing the cats sample into bench/out/dev-app');
  fs.mkdirSync(APP, { recursive: true });
  for (const f of ['package.json', 'tsconfig.json', 'tsconfig.build.json']) fs.copyFileSync(path.join(SAMPLE, f), path.join(APP, f));
  const npm = args => { const r = spawnSync('npm', [...args, '--no-audit', '--no-fund', '--legacy-peer-deps', '--loglevel=error'], { cwd: APP, stdio: 'inherit' }); if (r.status) process.exit(1); };
  npm(['install']);
  npm(['install', '-D', '@swc/cli@0.8.1', '@swc/core@1.16.12', '@swc-node/register@1.12.1', 'ts-node@10.9.2', 'tsx@4.23.15', '@swc/jest@0.2.39', 'ts-jest@29.4.14', 'jest@30.5.2']);
}
const ver = p => JSON.parse(fs.readFileSync(path.join(APP, 'node_modules', p, 'package.json'), 'utf8')).version;

const CTRL = path.join(APP, 'src/cats/cats.controller.ts');
function resetSrc() {
  fs.rmSync(path.join(APP, 'src'), { recursive: true, force: true });
  fs.rmSync(path.join(APP, 'dist'), { recursive: true, force: true });
  fs.rmSync(path.join(APP, 'tsconfig.build.tsbuildinfo'), { force: true });
  fs.cpSync(path.join(SAMPLE, 'src'), path.join(APP, 'src'), { recursive: true });
  const s = fs.readFileSync(CTRL, 'utf8');
  fs.writeFileSync(CTRL, s.replace('export class CatsController {', "export class CatsController {\n  @Get('version')\n  version() {\n    return 'v0';\n  }\n"));
}
const setVersion = v => fs.writeFileSync(CTRL, fs.readFileSync(CTRL, 'utf8').replace(/return 'v\d+';/, `return '${v}';`));

async function get() {
  // the sample's TransformInterceptor wraps every response as {"data": ...}
  try { const r = await fetch(`http://localhost:${PORT}/cats/version`); return (await r.json()).data ?? ''; } catch { return null; }
}
async function until(want, ms = 60000) {
  const t0 = performance.now();
  for (;;) {
    if (await get() === want) return performance.now() - t0;
    if (performance.now() - t0 > ms) throw new Error(`no '${want}' after ${ms} ms`);
    await new Promise(r => setTimeout(r, 2));
  }
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

const TOOLS = [
  ['**ternts dev --warm**', [TERNTS, 'dev', 'src', 'dist', '--esm', '--no-spec', '--sourcemap', '--warm', '--', 'node', 'dist/main.js']],
  ['**ternts dev**', [TERNTS, 'dev', 'src', 'dist', '--esm', '--no-spec', '--sourcemap', '--', 'node', 'dist/main.js']],
  ['`nest start --watch -b swc`', ['node_modules/.bin/nest', 'start', '--watch', '-b', 'swc']],
  ['`nest start --watch` (tsc)', ['node_modules/.bin/nest', 'start', '--watch']],
];

// One untimed boot first, so the first tool measured doesn't pay for a cold file cache.
{
  resetSrc();
  spawnSync(TERNTS, ['build', 'src', 'dist', '--esm', '--no-spec'], { cwd: APP });
  const p = spawn('node', ['dist/main.js'], { cwd: APP, detached: true, stdio: 'ignore' });
  await until('v0');
  process.kill(-p.pid, 'SIGTERM');
  while (await get() !== null) await sleep(20);
}

const results = [];
for (const [name, cmd] of TOOLS) {
  if (await get() !== null) { log(`port ${PORT} is in use`); process.exit(1); }
  resetSrc();
  log(`${name}: starting`);
  const t0 = performance.now();
  const p = spawn(cmd[0], cmd.slice(1), { cwd: APP, detached: true, stdio: 'ignore' });
  const times = [];
  let cold;
  try {
    await until('v0');
    cold = performance.now() - t0;
    await sleep(500);                               // let the watcher settle
    for (let i = 1; i <= ROUNDS; i++) {
      setVersion(`v${i}`);
      times.push(await until(`v${i}`));
      await sleep(300);
    }
  } finally {
    try { process.kill(-p.pid, 'SIGTERM'); } catch {}
    for (let i = 0; i < 100 && await get() !== null; i++) await sleep(50);
    try { process.kill(-p.pid, 'SIGKILL'); } catch {}
  }
  times.sort((a, b) => a - b);
  const r = { name, cold, min: times[0], median: times[times.length >> 1], max: times[times.length - 1] };
  log(`  cold ${Math.round(r.cold)} ms, reload median ${Math.round(r.median)} ms (min ${Math.round(r.min)}, max ${Math.round(r.max)})`);
  results.push(r);
}

// Running the TypeScript directly (no build): launch to the first right answer.
const RUNNERS = [
  ['**ternts/register**', ['node', '--import', path.join(B, '..', 'js', 'register.mjs'), 'src/main.ts'], {}],
  ['@swc-node/register', ['node', '--import', '@swc-node/register/esm-register', 'src/main.ts'], {}],
  ['ts-node (transpile only)', ['node', '--loader', 'ts-node/esm', 'src/main.ts'], { TS_NODE_TRANSPILE_ONLY: '1' }],
  ['tsx', ['node', '--import', 'tsx', 'src/main.ts'], {}],
];
async function answer(ms) {
  const t0 = performance.now();
  while (performance.now() - t0 < ms) {
    try { const r = await fetch(`http://localhost:${PORT}/cats/version`); return { status: r.status, body: await r.text() }; }
    catch { await sleep(2); }
  }
  return null;
}
resetSrc();
const runs = [];
for (const [name, cmd, env] of RUNNERS) {
  log(`${name}: running src/main.ts`);
  let best = Infinity, fail = '';
  for (let i = 0; i < 5 && !fail; i++) {
    const t0 = performance.now();
    const p = spawn(cmd[0], cmd.slice(1), { cwd: APP, detached: true, stdio: 'ignore', env: { ...process.env, ...env } });
    const r = await answer(30000);
    const t = performance.now() - t0;
    try { process.kill(-p.pid, 'SIGTERM'); } catch {}
    while (await get() !== null) await sleep(20);
    if (!r) fail = 'no answer in 30 s';
    else if (r.status !== 200 || JSON.parse(r.body).data !== 'v0') fail = `answers ${r.status} (${r.body.slice(0, 40)})`;
    else best = Math.min(best, t);
  }
  log(`  ${fail || Math.round(best) + ' ms'}`);
  runs.push({ name, best, fail });
}

const ms = x => `${Math.round(x)} ms`;
const base = results[0];
const x = (r, k) => r === base ? `**${ms(r[k])}**` : `${ms(r[k])} (${(r[k] / base[k]).toFixed(1)}x)`;
let md = `NestJS ${ver('@nestjs/core')} cats sample (ES modules), Nest CLI ${ver('@nestjs/cli')}, swc ${ver('@swc/core')}, ` +
  `TypeScript ${ver('typescript')}, Node ${process.version}; ${ROUNDS} edits each.\n\n`;
md += '| | save to new code answering (median) | min | max | cold start |\n|---|---|---|---|---|\n';
for (const r of results) md += `| ${r.name} | ${x(r, 'median')} | ${ms(r.min)} | ${ms(r.max)} | ${x(r, 'cold')} |\n`;
const rb = runs[0];
md += '\nRunning `src/main.ts` directly, launch to the first right answer (best of 5):\n\n| | |\n|---|---|\n';
for (const r of runs) md += `| ${r.name} | ${r.fail ? r.fail + (r.name === 'tsx' ? ': esbuild emits no decorator metadata, so Nest can\'t inject' : '') : r === rb ? `**${ms(r.best)}**` : `${ms(r.best)} (${(r.best / rb.best).toFixed(1)}x)`} |\n`;
fs.writeFileSync(path.join(B, 'out/dev-results.md'), md);
console.log(md);
