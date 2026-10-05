#!/usr/bin/env node
// run.mjs: ternts' tests. From the checkout:
//
//   node tests/run.mjs [suite...] [--update] [--corpus] [--tsconformance] [--build-wasm] [--group=a,b]
//
// suites: fixtures (per-file output vs tsc 5.9, tests/fixtures/), wasm (the same fixtures
// through js/ternts.wasm in-process, as ternts/jest and the Vite plugin run them), project (`ternts build -p`
// vs `tsc -p --noCheck`, tests/project/), cli (the command's behaviour, tests/cli.mjs); default
// all four. --update rewrites expected outputs from tsc (and snapshots from ternts): read the
// git diff before committing. --corpus also runs harness/regress.sh on the pinned Nest corpus
// (bench/setup.sh fetches it; slow). --tsconformance runs TypeScript's own test cases
// (harness/tsconformance.mjs) against the passing list in harness/tsconformance-baseline.txt. TERNTS_BIN=path tests that binary instead of building
// main.tn. --build-wasm rebuilds js/ternts.wasm and js/ternts-cli.wasm first (the wasm suite
// and the CLI's wasm fallback test skip when they're missing or older than the sources).
// Needs: tern, node 20+, harness/node_modules (cd harness && npm ci).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { ROOT, terntsBin, run, buildWasm } from './lib.mjs';
import { runFixtures } from './fixtures.mjs';
import { runProjects } from './project.mjs';
import { runCli } from './cli.mjs';

const args = process.argv.slice(2);
const update = args.includes('--update');
const corpus = args.includes('--corpus');
const tsconf = args.includes('--tsconformance');
const group = args.find((a) => a.startsWith('--group='));
const only = group ? group.slice(8).split(',') : null;
let suites = args.filter((a) => !a.startsWith('--'));
if (suites.length === 0) suites = ['fixtures', 'wasm', 'project', 'cli'];

const t0 = Date.now();
const bin = terntsBin();
if (args.includes('--build-wasm')) buildWasm();
console.log(`ternts: ${path.relative(process.cwd(), bin) || bin}`);
const results = [];
for (const s of suites) {
  const t = Date.now();
  let r;
  if (s === 'fixtures') r = await runFixtures({ bin, update, only });
  else if (s === 'wasm') r = await runFixtures({ bin, only, engine: 'wasm' });
  else if (s === 'project') r = await runProjects({ bin, update, only });
  else if (s === 'cli') r = await runCli({ bin });
  else { console.error(`unknown suite ${s} (fixtures, wasm, project, cli)`); process.exit(2); }
  r.ms = Date.now() - t;
  results.push(r);
}
if (corpus) {
  // the pinned NestJS corpus (bench/setup.sh clones it); its file list as bench/run.mjs writes it
  const dir = path.join(ROOT, 'bench', 'corpus', 'nest');
  const list = path.join(os.tmpdir(), `ternts-nest-files-${process.pid}.txt`);
  const r = { suite: 'corpus', passed: 0, failed: [], skipped: [], xfailed: [], ms: 0 };
  const t = Date.now();
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir, { recursive: true })
      .filter((f) => f.endsWith('.ts') && !f.endsWith('.d.ts') && !f.split(path.sep).includes('node_modules'))
      .map((f) => path.join(dir, f)).filter((f) => fs.statSync(f).isFile()).sort();
    fs.writeFileSync(list, files.join('\n') + '\n');
  }
  if (!fs.existsSync(dir)) { r.skipped.push('nest'); console.log('skip corpus: run bench/setup.sh first'); }
  else {
    const out = run(path.join(ROOT, 'harness', 'regress.sh'), [list], { cwd: ROOT, env: { ...process.env, TERNTS: bin } });
    process.stdout.write(out.stdout);
    for (const line of out.stdout.split('\n').filter((l) => l.includes('identical'))) {
      const m = line.match(/(\d+) identical, (\d+) different, (\d+) not transpiled.*of (\d+)/);
      if (m && m[1] === m[4]) r.passed++; else r.failed.push(line.trim());
    }
    if (r.passed + r.failed.length === 0) r.failed.push('regress.sh printed no results');
    fs.rmSync(list, { force: true });
  }
  r.ms = Date.now() - t;
  results.push(r);
}

if (tsconf) {
  // TypeScript's own test cases vs tsc (harness/tsconformance.mjs): fails when a case in the
  // committed baseline no longer passes
  const r = { suite: 'tsconf', passed: 0, failed: [], skipped: [], xfailed: [], ms: 0 };
  const t = Date.now();
  const base = path.join(ROOT, 'harness', 'tsconformance-baseline.txt');
  const out = run(process.execPath, [path.join(ROOT, 'harness', 'tsconformance.mjs'), '--bin', bin, '--baseline', base], { cwd: ROOT });
  process.stdout.write(out.stdout + out.stderr);
  if (/no such file|ENOENT/.test(out.stderr) || !/tsconformance:/.test(out.stdout)) { r.skipped.push('cases'); console.log('skip tsconformance: clone the cases (see harness/tsconformance.mjs)'); }
  else if (out.status !== 0) r.failed.push('regressed against harness/tsconformance-baseline.txt');
  else r.passed = +(out.stdout.match(/tsconformance: (\d+)\//)?.[1] ?? 0);
  r.ms = Date.now() - t;
  results.push(r);
}

console.log('');
let failed = 0;
for (const r of results) {
  failed += r.failed.length;
  const extra = [r.xfailed.length && `${r.xfailed.length} known bugs`, r.skipped.length && `${r.skipped.length} skipped`].filter(Boolean).join(', ');
  console.log(`${r.failed.length ? 'FAIL' : 'ok  '} ${r.suite.padEnd(9)} ${r.passed} passed, ${r.failed.length} failed${extra ? ', ' + extra : ''} (${(r.ms / 1000).toFixed(1)} s)`);
}
console.log(`${failed ? 'FAILED' : 'all passed'} in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
process.exit(failed ? 1 : 0);
