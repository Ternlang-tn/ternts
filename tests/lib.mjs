// lib.mjs: what the suites share: the ternts binary, tsc 5.9, AST comparison, diffs, temp dirs.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const TESTS = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.join(TESTS, '..');
// acorn and TypeScript 5.9 come from harness/node_modules (cd harness && npm ci)
const req = createRequire(path.join(ROOT, 'harness', 'package.json'));
export const acorn = req('acorn');
export const ts = req('ts5');
let prettier = null;
try { prettier = req('prettier'); } catch {}
// Both sides through prettier (when it parses them) so a diff shows what differs, not layout.
export async function pretty(code) {
  if (!prettier) return code;
  try { return await prettier.format(code.replace(/\b_[a-z]\b|\b_\d+\b/g, '_T'), { parser: 'babel', printWidth: 120 }); }
  catch { return code; }
}
export const TSC = path.join(path.dirname(req.resolve('ts5/package.json')), 'bin', 'tsc');

// What every option set starts from: ternts' defaults (legacy decorators with metadata, ES2022,
// comments dropped). A set's compilerOptions go on top.
export const DEFAULTS = { target: 'es2022', experimentalDecorators: true, emitDecoratorMetadata: true, removeComments: true };

// The ternts binary under test: $TERNTS_BIN, else built from this checkout into a temp dir
// (tern caches the build, so this is quick when nothing changed).
export function terntsBin() {
  if (process.env.TERNTS_BIN) return path.resolve(process.env.TERNTS_BIN);
  const tag = ROOT.replace(/[^A-Za-z0-9]+/g, '_').slice(-60);   // one binary per checkout
  const out = path.join(os.tmpdir(), 'ternts-tests', tag, 'ternts');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const r = spawnSync('tern', ['build', 'main.tn', '-o', out], { cwd: ROOT, encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`can't build ternts (set TERNTS_BIN to test a binary):\n${r.stdout}${r.stderr}`);
  return out;
}

// js/ternts.wasm (the in-process engine) and js/ternts-cli.wasm (the command where there's no
// binary) are build outputs (gitignored): 'missing', 'stale' (older than a .tn source), or ''.
export function wasmState(file) {
  const p = path.join(ROOT, 'js', file);
  if (!fs.existsSync(p)) return 'missing';
  const t = fs.statSync(p).mtimeMs;
  const srcs = [...fs.readdirSync(ROOT), ...fs.readdirSync(path.join(ROOT, 'ts')).map((f) => 'ts/' + f)].filter((f) => f.endsWith('.tn'));
  return srcs.some((f) => fs.statSync(path.join(ROOT, f)).mtimeMs > t) ? 'stale' : '';
}

// Builds both, as npm/build.mjs does (needs Tern's wasm toolchain).
export function buildWasm() {
  for (const [args, out] of [[['build', '--lib', '--target', 'wasm', 'wasm.tn', '-o', 'js/ternts.wasm'], 'js/ternts.wasm'],
                             [['build', '--target', 'wasm', 'wasi.tn', '-o', 'js/ternts-cli.wasm'], 'js/ternts-cli.wasm']]) {
    console.log(`building ${out}...`);
    const r = spawnSync('tern', args, { cwd: ROOT, encoding: 'utf8' });
    if (r.status !== 0) throw new Error(`can't build ${out}:\n${r.stdout}${r.stderr}`);
  }
  for (const f of ['js/ternts.mjs', 'js/ternts.d.ts']) fs.rmSync(path.join(ROOT, f), { force: true });
}

export function tmpdir(name) {
  return fs.mkdtempSync(path.join(os.tmpdir(), `ternts-${name}-`));
}

// tsc's temporary names (_a, _b, _1) normalized, positions and raw text dropped: two outputs
// are the same program when this is equal (what harness/tscheck.mjs compares).
const TEMP = /^_[a-z]$|^_\d+$/;
function parse(code) {
  const o = { ecmaVersion: 'latest', allowReturnOutsideFunction: true, allowHashBang: true };
  try { return acorn.parse(code, { ...o, sourceType: 'script' }); }
  catch { return acorn.parse(code, { ...o, sourceType: 'module', allowAwaitOutsideFunction: true }); }
}
export function norm(code) {
  return JSON.stringify(parse(code), (k, v) => {
    if (k === 'start' || k === 'end' || k === 'raw') return undefined;
    if (typeof v === 'bigint') return v.toString() + 'n';
    if (v && v.type === 'Identifier' && TEMP.test(v.name)) return { type: 'Identifier', name: '_T' };
    if (v && v.type === 'ExpressionStatement' && v.directive) { const { directive, ...r } = v; return r; }
    return v;
  });
}

// Same program? (JSX preserve output isn't JavaScript: both sides go through tsc's react-jsx
// first, as harness/preservecheck.mjs does.)
export function same(want, got, { jsxPreserve = false, fileName = 'x.tsx' } = {}) {
  if (want === got) return true;
  let a = want, b = got;
  if (jsxPreserve) {
    const o = { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, removeComments: true };
    const t = (s) => ts.transpileModule(s, { fileName, compilerOptions: o, reportDiagnostics: false }).outputText;
    a = t(want); b = t(got);
  }
  let ok = false;
  try { ok = norm(a) === norm(b); } catch {}
  if (!ok && (!parses(want) || !parses(got))) ok = printed(want, fileName) === printed(got, fileName);
  return ok;
}

function parses(code) {
  try { parse(code); return true; } catch { return false; }
}

// acorn rejects syntax it doesn't know (`accessor x`, decorators) and programs with early errors
// (a redeclared let) that tsc still writes for an erroneous input: those are compared through
// TypeScript's own parser and printer instead (layout, comments and temp names dropped).
const printer = ts.createPrinter({ removeComments: true });
export function printed(code, fileName = 'x.ts') {
  const kind = /\.(tsx|jsx)$/.test(fileName) ? ts.ScriptKind.JSX : ts.ScriptKind.JS;
  const sf = ts.createSourceFile('x.js', code, ts.ScriptTarget.ESNext, false, kind);
  return printer.printFile(sf).replace(/\b_[a-z]\b|\b_\d+\b/g, '_T').replace(/\s+/g, ' ');
}

// tsc 5.9 transpileModule with tsconfig-style compilerOptions ({ module: "commonjs", ... }).
export function tscTranspile(src, fileName, compilerOptions) {
  const { options, errors } = ts.convertCompilerOptionsFromJson(compilerOptions, '.');
  if (errors.length) throw new Error(`bad compilerOptions ${JSON.stringify(compilerOptions)}: ${errors.map((e) => e.messageText).join('; ')}`);
  return ts.transpileModule(src, { fileName, compilerOptions: options, reportDiagnostics: false }).outputText;
}

// A line diff (want vs got), with a few lines of context, for the failure report.
export function diff(want, got, context = 3, max = 60) {
  const a = want.split('\n'), b = got.split('\n');
  const n = a.length, m = b.length;
  if (n * m > 4e6) return `  (too long to diff: ${n} vs ${m} lines)`;
  const L = Array.from({ length: n + 1 }, () => new Int32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) L[i][j] = a[i] === b[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const ops = [];
  let i = 0, j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && a[i] === b[j]) { ops.push([' ', a[i]]); i++; j++; }
    else if (j < m && (i === n || L[i][j + 1] >= L[i + 1][j])) { ops.push(['+', b[j]]); j++; }
    else { ops.push(['-', a[i]]); i++; }
  }
  const keep = new Array(ops.length).fill(false);
  ops.forEach((o, k) => { if (o[0] !== ' ') for (let d = -context; d <= context; d++) if (ops[k + d]) keep[k + d] = true; });
  const out = [];
  let gap = false;
  ops.forEach((o, k) => {
    if (!keep[k]) { gap = true; return; }
    if (gap && out.length) out.push('  ...');
    gap = false;
    out.push(`  ${o[0]} ${o[1]}`);
  });
  if (out.length > max) return out.slice(0, max).join('\n') + `\n  ... (${out.length - max} more lines)`;
  return out.join('\n');
}

// Every file below dir (relative paths), sorted.
export function walk(dir, base = dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).sort((x, y) => x.name < y.name ? -1 : 1).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p, base) : [path.relative(base, p)];
  });
}

export function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', ...opts });
  return { status: r.status, stdout: r.stdout ?? '', stderr: r.stderr ?? '', error: r.error };
}

export { execFileSync };

// Results: suites call pass/fail/skip/xfail; the runner prints the summary.
export class Results {
  constructor(suite) { this.suite = suite; this.passed = 0; this.failed = []; this.skipped = []; this.xfailed = []; }
  pass() { this.passed++; }
  fail(name, detail = '') { this.failed.push(name); console.log(`FAIL ${this.suite}: ${name}${detail ? '\n' + detail : ''}`); }
  skip(name, why) { this.skipped.push(name); console.log(`skip ${this.suite}: ${name} (${why})`); }
  // a known bug: reported, doesn't fail the run; if it starts passing, say so (remove the mark)
  xfail(name, ok, why) {
    if (ok) this.fail(name, `  marked as a known bug (${why}) but passes now: remove the mark`);
    else { this.xfailed.push(name); console.log(`known bug ${this.suite}: ${name} (${why})`); }
  }
  check(name, ok, detail) { ok ? this.pass() : this.fail(name, typeof detail === 'function' ? detail() : detail); }
}
