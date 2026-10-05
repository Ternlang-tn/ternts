#!/usr/bin/env node
// tsconformance.mjs: TypeScript's own test cases (v5.9.3) through ternts and tsc's
// transpileModule, compared by AST. --baseline FILE exits 1 if a listed case stops passing.
//   node harness/tsconformance.mjs [--cases DIR] [--bin TERNTS] [--filter SUBSTR] [--jobs N]
//                                  [--report FILE.md] [--baseline FILE] [--write-baseline]
//                                  [--show ID] [--errors]
// DIR defaults to $TS_CASES or ~/ternts-corpus/typescript/tests/cases (clone with
//   git clone --depth 1 --branch v5.9.3 --filter=blob:none --sparse \
//       https://github.com/microsoft/TypeScript.git && git sparse-checkout set --no-cone \
//       tests/cases/conformance tests/cases/compiler tests/cases/transpile).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { ts, acorn, norm, same, diff, pretty, terntsBin } from '../tests/lib.mjs';

const args = process.argv.slice(2);
const opt = (name, d) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : d; };
const CASES = opt('--cases', process.env.TS_CASES || path.join(os.homedir(), 'ternts-corpus/typescript/tests/cases'));
const FILTER = opt('--filter', '');
const JOBS = +opt('--jobs', '4');
const REPORT = opt('--report', '');
const BASELINE = opt('--baseline', '');
const SHOW = opt('--show', '');
const bin = path.resolve(opt('--bin', '') || terntsBin());

// Targets ternts writes; others in [ES2015, ES2022) run at ES2022 as "target pending".
const LANDED = new Set(['es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'es2023', 'es2024', 'esnext']);
const BELOW = new Set(['es3', 'es5']);
const BAD_MODULE = new Set(['amd', 'umd', 'system', 'none']);
// Options that change transpileModule's output and ternts doesn't support (when not false/default).
const UNSUPPORTED = { importHelpers: true, rewriteRelativeImportExtensions: true,
  moduleDetection: (v) => v !== 'auto' && v !== 'force', experimentalDecorators: null, jsx: (v) => v === 'react-native' };
// Options passed on (they change emit); everything else in a case is type-checking only.
const EMIT = new Set(['target', 'module', 'experimentalDecorators', 'emitDecoratorMetadata', 'useDefineForClassFields',
  'jsx', 'jsxFactory', 'jsxFragmentFactory', 'jsxImportSource', 'esModuleInterop', 'verbatimModuleSyntax',
  'strict', 'alwaysStrict', 'strictNullChecks', 'preserveConstEnums', 'isolatedModules', 'removeComments',
  'importHelpers', 'noEmitHelpers', 'rewriteRelativeImportExtensions', 'moduleDetection']);
const CASE_INSENSITIVE = new Map([...EMIT].map((k) => [k.toLowerCase(), k]));

// ---- cases -> units

function caseFiles() {
  const out = [];
  for (const sub of ['conformance', 'compiler', 'transpile']) {
    const dir = path.join(CASES, sub);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir, { recursive: true })) {
      if (!/\.(ts|tsx|mts|cts)$/.test(f) || /\.d\.(ts|mts|cts)$/.test(f)) continue;
      const rel = path.join(sub, f);
      if (!FILTER || rel.includes(FILTER)) out.push(rel);
    }
  }
  return out.sort();
}

const DIRECTIVE = /^\/\/\s*@(\w+)\s*:\s*([^\r\n]*)/;

// { options: {name: value}, units: [{ name, src }] } as TypeScript's harness splits a case.
function parseCase(text, file) {
  const options = {};
  const units = [];
  let name = path.basename(file), lines = [];
  const flush = () => { if (lines.length && (units.length || lines.some((l) => l.trim()))) units.push({ name, src: lines.join('\n') }); };
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(DIRECTIVE);
    if (m) {
      const key = m[1].toLowerCase();
      if (key === 'filename') { flush(); name = m[2].trim(); lines = []; continue; }
      options[key] = m[2].trim();
      continue;
    }
    lines.push(line);
  }
  flush();
  return { options, units };
}

// Comma lists are variants: {target: "es5, es2015"} -> two option sets.
function variants(options) {
  let sets = [{}];
  for (const [k, raw] of Object.entries(options)) {
    const vals = raw.split(',').map((v) => v.trim()).filter((v) => v && v !== '*');
    if (vals.length === 0) continue;
    const next = [];
    for (const s of sets) for (const v of vals) next.push({ ...s, [k]: v });
    sets = next.slice(0, 16);
  }
  return sets;
}

const asValue = (v) => v === 'true' ? true : v === 'false' ? false : v.toLowerCase();

// A variant -> { co (tsconfig compilerOptions for both sides), skip reason, pending }.
function settle(variant) {
  const co = {};
  for (const [k, v] of Object.entries(variant)) {
    const name = CASE_INSENSITIVE.get(k);
    if (name) co[name] = asValue(v);
  }
  // tsc's harness defaults to no decorators, ternts to legacy ones, so always set it
  if (co.experimentalDecorators === undefined) co.experimentalDecorators = false;
  if (co.target === 'es6') co.target = 'es2015';
  const target = co.target ?? 'es2022';
  if (BELOW.has(target)) return { skip: 'target below ES2015' };
  if (co.module && BAD_MODULE.has(co.module)) return { skip: `module ${co.module}` };
  for (const [k, test] of Object.entries(UNSUPPORTED)) {
    if (co[k] === undefined || test === null) continue;
    if (test === true ? co[k] === true : test(co[k])) return { skip: `unsupported option ${k}` };
  }
  let pending = '';
  if (!LANDED.has(target)) { pending = target; co.target = 'es2022'; }
  if (!co.target) co.target = 'es2022';
  return { co, pending };
}

function isModuleEsm(co, name) {
  if (co.module === 'preserve') return true;          // module syntax as written, any extension
  if (/\.mts$/.test(name)) return true;
  if (/\.cts$/.test(name)) return false;
  const m = co.module;
  if (!m) return true;                                // ES2015+ target: module defaults to es2015
  return /^(es|preserve)/.test(m);
}

// ---- ternts --serve, one server per option set

class Server {
  constructor(project) {
    this.proc = spawn(bin, ['--serve', '-p', project], { stdio: ['pipe', 'pipe', 'pipe'] });
    this.buf = Buffer.alloc(0);
    this.waiting = null;
    this.dead = '';
    this.proc.stdout.on('data', (d) => { this.buf = Buffer.concat([this.buf, d]); this.drain(); });
    this.proc.stderr.on('data', () => {});
    this.proc.on('exit', (c, s) => { this.dead = `ternts exited (${c ?? s})`; if (this.waiting) { const w = this.waiting; this.waiting = null; w({ error: this.dead }); } });
  }
  drain() {
    if (!this.waiting) return;
    const nl = this.buf.indexOf(10);
    if (nl < 0) return;
    const [e, c] = this.buf.subarray(0, nl).toString().split(' ').map(Number);
    const end = nl + 1 + e + c + 1;
    if (this.buf.length < end) return;
    const err = this.buf.subarray(nl + 1, nl + 1 + e).toString();
    const code = this.buf.subarray(nl + 1 + e, nl + 1 + e + c).toString();
    this.buf = this.buf.subarray(end);
    const w = this.waiting; this.waiting = null;
    w(err ? { error: err } : { code });
  }
  transform(src, file, esm) {
    if (this.dead) return Promise.resolve({ error: this.dead });
    return new Promise((resolve) => {
      const timer = setTimeout(() => { this.proc.kill('SIGKILL'); }, 30000);
      this.waiting = (r) => { clearTimeout(timer); resolve(r); };
      const b = Buffer.from(src);
      this.proc.stdin.write(`${esm ? 1 : 0} ${b.length} 0 ${file.replace(/\n/g, ' ')}\n`);
      this.proc.stdin.write(b);
    });
  }
  close() { try { this.proc.stdin.end(); } catch {} }
}

// ---- tsc

function tscOut(src, name, co) {
  const { options } = ts.convertCompilerOptionsFromJson(co, '.');
  return ts.transpileModule(src, { fileName: name, compilerOptions: options, reportDiagnostics: false }).outputText;
}

function parseErrors(src, name) {
  const kind = /\.tsx$/.test(name) ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  const sf = ts.createSourceFile(name, src, ts.ScriptTarget.ESNext, false, kind);
  return sf.parseDiagnostics?.length ?? 0;
}

const printer = ts.createPrinter({ removeComments: true });

// TS1xxx grammar errors for a unit: invalid programs tsc only recovers from, counted apart from failures.
function grammarErrors(src, name, co) {
  const { options } = ts.convertCompilerOptionsFromJson(co, '.');
  const o = { ...options, noLib: true, noResolve: true, types: [], noEmit: true };
  const file = '/' + name;
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.ESNext, true);
  const host = ts.createCompilerHost(o);
  host.getSourceFile = (f) => f === file ? sf : undefined;
  host.fileExists = (f) => f === file;
  host.readFile = (f) => f === file ? src : undefined;
  const prog = ts.createProgram([file], o, host);
  let diags = [];
  try { diags = [...prog.getSyntacticDiagnostics(sf), ...prog.getSemanticDiagnostics(sf)]; } catch { return []; }
  return diags.filter((d) => d.code >= 1000 && d.code < 2000 && !IGNORED_1XXX.has(d.code)).map((d) => d.code);
}
// TS1xxx codes that aren't about the program's syntax (module resolution, options, lib)
const IGNORED_1XXX = new Set([1192, 1202, 1203, 1259, 1262, 1371, 1378, 1375, 1479, 1484, 1485, 1286, 1287, 1290, 1291, 1292, 1293]);

// ---- run

const FILES = caseFiles();
if (FILES.length === 0) { console.error(`tsconformance: no cases in ${CASES} (see the top of this file)`); process.exit(0); }
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ternts-tsconf-'));
const groups = new Map();          // options key -> { co, jobs: [{ id, name, src, esm, pending }] }
const skipped = new Map();
const skip = (reason) => skipped.set(reason, (skipped.get(reason) ?? 0) + 1);

for (const rel of FILES) {
  const text = fs.readFileSync(path.join(CASES, rel), 'utf8');
  const { options, units } = parseCase(text, rel);
  const vs = variants(options);
  vs.forEach((variant, vi) => {
    const s = settle(variant);
    for (const [ui, u] of units.entries()) {
      if (!/\.(ts|tsx|mts|cts)$/.test(u.name) || /\.d\.([^./]+\.)?(ts|mts|cts)$/.test(u.name)) { skip('not TypeScript (.js/.json/.d.ts)'); continue; }
      if (s.skip) { skip(s.skip); continue; }
      if (parseErrors(u.src, u.name)) { skip('invalid input (tsc reports syntax errors)'); continue; }
      const id = `${rel}${units.length > 1 ? '#' + u.name : ''}${vs.length > 1 ? ' [' + Object.entries(variant).map(([k, v]) => `${k}=${v}`).join(',') + ']' : ''}`;
      const key = JSON.stringify(s.co);
      if (!groups.has(key)) groups.set(key, { co: s.co, jobs: [] });
      groups.get(key).jobs.push({ id, name: path.basename(u.name), src: u.src, esm: isModuleEsm(s.co, u.name), pending: s.pending });
    }
  });
}

function sameOut(want, got, co, name) {
  if (got === undefined) return false;
  try { return same(want, got, { jsxPreserve: co.jsx === 'preserve', fileName: name }); } catch { return false; }
}

const results = [];                 // { id, status: pass|fail|error, pending, detail }
async function runGroup(g, gi) {
  const project = path.join(tmp, `g${gi}`, 'tsconfig.json');
  fs.mkdirSync(path.dirname(project), { recursive: true });
  fs.writeFileSync(project, JSON.stringify({ compilerOptions: g.co }));
  let server = new Server(project);
  for (const j of g.jobs) {
    let want;
    try { want = tscOut(j.src, j.name, g.co); } catch (e) { if (process.env.TSCONF_DEBUG) console.error(j.id, e.message.split('\n')[0]); skip('tsc throws'); continue; }
    const r = await server.transform(j.src, j.name, j.esm);
    if (r.error && /^ternts exited/.test(r.error)) { server.close(); server = new Server(project); }
    if ((r.error !== undefined || !sameOut(want, r.code, g.co, j.name)) && grammarErrors(j.src, j.name, g.co).length) { skip('invalid input (tsc\'s checker reports grammar errors)'); continue; }
    if (r.error !== undefined) { results.push({ id: j.id, status: 'error', pending: j.pending, err: r.error.trim(), co: g.co, src: j.src, name: j.name }); continue; }
    const ok = sameOut(want, r.code, g.co, j.name);
    results.push({ id: j.id, status: ok ? 'pass' : 'fail', pending: j.pending, want, got: r.code, co: g.co, src: j.src, name: j.name });
  }
  server.close();
}

const all = [...groups.values()];
let next = 0;
await Promise.all(Array.from({ length: JOBS }, async () => { while (next < all.length) { const k = next++; await runGroup(all[k], k); } }));
fs.rmSync(tmp, { recursive: true, force: true });
results.sort((a, b) => a.id < b.id ? -1 : 1);

// ---- report

const counted = (st, pend) => results.filter((r) => r.status === st && !!r.pending === pend).length;
const totals = {
  pass: counted('pass', false), fail: counted('fail', false), error: counted('error', false),
  pendingPass: counted('pass', true), pendingFail: counted('fail', true) + counted('error', true),
};
const ran = totals.pass + totals.fail + totals.error;
console.log(`tsconformance: ${totals.pass}/${ran} identical to tsc (${(100 * totals.pass / Math.max(ran, 1)).toFixed(2)}%), ${totals.fail} different, ${totals.error} ternts errors`);
console.log(`  target pending (ran at ES2022): ${totals.pendingPass} identical, ${totals.pendingFail} not`);
for (const [r, n] of [...skipped].sort((a, b) => b[1] - a[1])) console.log(`  skipped: ${n} ${r}`);

if (args.includes('--errors'))                   // every ternts error, one line each
  for (const r of results.filter((x) => x.status === 'error')) console.log(`ERROR ${r.id} ${JSON.stringify(r.co)}: ${r.err.split('\n')[0]}`);

if (SHOW) {
  for (const r of results.filter((x) => x.id.includes(SHOW))) {
    console.log(`\n=== ${r.id} ${r.status} ${JSON.stringify(r.co)}`);
    if (r.status === 'error') console.log(r.err);
    if (r.status === 'fail') console.log(diff(await pretty(r.want), await pretty(r.got), 3, 200));
  }
}

// A line with names generalized, as a cluster key for failures with one root cause.
function shape(line) {
  return line.trim().replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`/g, 'S').replace(/\b\d+(\.\d+)?\b/g, 'N')
    .replace(/\b[A-Za-z_$][\w$]*\b/g, (w) => KEEP.has(w) ? w : 'x').slice(0, 120);
}
const KEEP = new Set('var let const function class extends return if else for while do switch case default break continue new this super typeof void delete in of instanceof async await yield static get set import export from as require exports module Object defineProperty __decorate __metadata __param __awaiter __rest __assign __extends __esModule __importDefault __importStar __createBinding __exportStar __classPrivateFieldGet __classPrivateFieldSet __classPrivateFieldIn __runInitializers __esDecorate __setFunctionName __propKey __addDisposableResource __disposeResources __asyncGenerator __await __asyncValues __asyncDelegator __makeTemplateObject __spreadArray __generator __values __read __rewriteRelativeImportExtension enumerable get value undefined null true false Symbol Reflect use strict React createElement jsx jsxs Fragment _jsx _jsxs'.split(' '));

// The first top-level statement that differs by AST, as a cluster key.
const TEMP = /^_[a-z]$|^_\d+$/;
function stmts(code) {
  const o = { ecmaVersion: 'latest', allowReturnOutsideFunction: true, allowHashBang: true };
  let ast;
  try { ast = acorn.parse(code, { ...o, sourceType: 'script' }); }
  catch { try { ast = acorn.parse(code, { ...o, sourceType: 'module', allowAwaitOutsideFunction: true }); } catch { return null; } }
  const key = (n) => JSON.stringify(n, (k, v) => k === 'start' || k === 'end' || k === 'raw' ? undefined : typeof v === 'bigint' ? v + 'n' : v && v.type === 'Identifier' && TEMP.test(v.name) ? { type: 'Identifier', name: '_T' } : v);
  return ast.body.map((n) => ({ key: key(n), text: code.slice(n.start, n.end) }));
}
async function firstDiff(r) {
  let a = stmts(r.want), b = stmts(r.got);
  if (!a || !b) { a = tsStmts(r.want, r.name); b = tsStmts(r.got, r.name); }
  let i = 0;
  while (i < a.length && i < b.length && a[i].key === b[i].key) i++;
  // inside the statement: the first differing line of the two (formatted) texts
  const pa = a[i] ? (await pretty(a[i].text)).split('\n') : ['<end>'], pb = b[i] ? (await pretty(b[i].text)).split('\n') : ['<end>'];
  let j = 0;
  while (j < pa.length && j < pb.length && pa[j] === pb[j]) j++;
  return `- ${shape(pa[j] ?? pa[pa.length - 1] ?? '')}\n+ ${shape(pb[j] ?? pb[pb.length - 1] ?? '')}`;
}
// The same through TypeScript's parser, for outputs acorn rejects.
function tsStmts(code, name) {
  const kind = /\.(tsx|jsx)$/.test(name) ? ts.ScriptKind.JSX : ts.ScriptKind.JS;
  const sf = ts.createSourceFile('x.js', code, ts.ScriptTarget.ESNext, false, kind);
  return sf.statements.map((n) => { const t = printer.printNode(ts.EmitHint.Unspecified, n, sf); return { key: t.replace(/\b_[a-z]\b|\b_\d+\b/g, '_T').replace(/\s+/g, ' '), text: t }; });
}

if (REPORT) {
  const clusters = new Map();
  for (const r of results) {
    if (r.status === 'pass') continue;
    const key = r.status === 'error' ? `ternts error: ${r.err.replace(/^\d+:\d+:\s*/, '').replace(/`[^`]*`/g, '`x`').replace(/\d+/g, 'N').slice(0, 100)}` : await firstDiff(r);
    // below ES2022 the output is lowered: a cluster of only those is a down-levelling one
    const lowering = /^es20(1\d|2[01])$/.test(r.co.target ?? '');
    const k = (r.pending ? '[target pending] ' : '') + (lowering ? '[lowering] ' : '') + key;
    if (!clusters.has(k)) clusters.set(k, []);
    clusters.get(k).push(r);
  }
  const sorted = [...clusters].sort((a, b) => b[1].length - a[1].length);
  const out = [];
  out.push('# TypeScript conformance: ternts vs tsc 5.9 transpileModule', '');
  out.push('Generated by `node harness/tsconformance.mjs --report harness/tsconformance-report.md` (cases: TypeScript v5.9.3 tests/cases/{conformance,compiler,transpile}). Compared by AST (tests/lib.mjs norm).', '');
  const notes = path.join(path.dirname(new URL(import.meta.url).pathname), 'tsconformance-notes.md');
  if (fs.existsSync(notes)) out.push(fs.readFileSync(notes, 'utf8').trim(), '');
  // the worst kind: ternts' output isn't JavaScript where tsc's is (a SyntaxError at load)
  const parses = (code) => stmts(code) !== null;
  const broken = results.filter((r) => r.status === 'fail' && parses(r.want) && !parses(r.got));
  out.push('## Totals', '');
  out.push(`- **ternts output that doesn't parse (tsc's does): ${broken.length}**${broken.length ? ' (listed first below)' : ''}`);
  out.push(`- identical to tsc: **${totals.pass} / ${ran}** (${(100 * totals.pass / Math.max(ran, 1)).toFixed(2)}%)`);
  out.push(`- different output: ${totals.fail}`, `- ternts error (refused): ${totals.error}`);
  out.push(`- target pending (ES2016/ES2015, ran at ES2022): ${totals.pendingPass} identical, ${totals.pendingFail} not`);
  for (const [r, n] of [...skipped].sort((a, b) => b[1] - a[1])) out.push(`- skipped, ${r}: ${n}`);
  if (broken.length) {
    out.push('', '## ternts output that doesn\'t parse', '', 'tsc\'s output for these is JavaScript and ternts\' isn\'t: fix these first.', '');
    const why = (code) => { try { acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module', allowReturnOutsideFunction: true, allowHashBang: true, allowAwaitOutsideFunction: true }); return ''; } catch (e) { const line = code.split('\n')[(e.loc?.line ?? 1) - 1] ?? ''; return `${e.message}: \`${line.trim().slice(0, 90)}\``; } };
    for (const r of broken) out.push(`- \`${r.id}\` ${JSON.stringify(r.co)}  \n  ${why(r.got)}`);
  }
  out.push('', '## Failure clusters', '', 'By the first differing line (names and literals generalized) or ternts\' error. Largest first.', '');
  for (const [k, rs] of sorted.slice(0, 80)) {
    const ex = rs.slice().sort((a, b) => a.src.length - b.src.length)[0];
    out.push(`### ${rs.length} × ${k.replace(/\n/g, '  ').slice(0, 140)}`, '');
    out.push('```diff', k, '```', '');
    out.push(`Smallest: \`${ex.id}\` ${JSON.stringify(ex.co)}`, '');
    if (ex.src.length < 1500) out.push('```ts', ex.src.trim(), '```', '');
    out.push(`Also: ${rs.slice(0, 6).filter((r) => r !== ex).map((r) => '`' + r.id + '`').join(', ')}`, '');
  }
  if (sorted.length > 80) out.push(`(${sorted.length - 80} smaller clusters not shown)`);
  fs.writeFileSync(REPORT, out.join('\n') + '\n');
  console.log(`wrote ${REPORT} (${sorted.length} clusters)`);
}

// target-pending cases are left out of the baseline
const passing = results.filter((r) => r.status === 'pass' && !r.pending).map((r) => r.id);
if (args.includes('--write-baseline') && BASELINE) {
  fs.writeFileSync(BASELINE, passing.join('\n') + '\n');
  console.log(`wrote ${BASELINE} (${passing.length} passing)`);
} else if (BASELINE) {
  const want = fs.readFileSync(BASELINE, 'utf8').split('\n').filter(Boolean);
  const now = new Set(passing);
  const lost = want.filter((id) => !now.has(id));
  if (lost.length) {
    console.log(`REGRESSED: ${lost.length} cases passed before and don't now:`);
    for (const id of lost.slice(0, 50)) console.log('  ' + id);
    process.exit(1);
  }
  console.log(`baseline: all ${want.length} still pass (${passing.length - want.length} more now)`);
}
