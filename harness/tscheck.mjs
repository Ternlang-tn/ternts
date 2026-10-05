// Compare ternts output with tsc's transpileModule by AST.
// usage: node tscheck.mjs LIST OUTDIR [--define --esm --interop --strict --jsx=MODE] [--show N]
// (TARGET=es2015 .. esnext; default es2023)
import fs from 'fs';
import * as acorn from 'acorn';
import ts from 'ts5';
const [list, outdir, ...rest] = process.argv.slice(2);
const useDefine = rest.includes('--define');
const esm = rest.includes('--esm');
const interop = rest.includes('--interop');
const strict = rest.includes('--strict');
const show = rest.includes('--show') ? +rest[rest.indexOf('--show') + 1] : 8;
const files = fs.readFileSync(list, 'utf8').split('\n').filter(Boolean);
const jsxArg = (rest.find(a => a.startsWith('--jsx=')) || '--jsx=react-jsx').slice(6);
const jsxSource = (rest.find(a => a.startsWith('--jsx-import-source=')) || '').slice(20) || undefined;
const opts = { jsx: { react: ts.JsxEmit.React, 'react-jsx': ts.JsxEmit.ReactJSX, 'react-jsxdev': ts.JsxEmit.ReactJSXDev, preserve: ts.JsxEmit.Preserve }[jsxArg], jsxImportSource: jsxSource, module: esm ? ts.ModuleKind.ESNext : ts.ModuleKind.CommonJS, target: { es2015: ts.ScriptTarget.ES2015, es2016: ts.ScriptTarget.ES2016, es2017: ts.ScriptTarget.ES2017, es2018: ts.ScriptTarget.ES2018, es2019: ts.ScriptTarget.ES2019, es2020: ts.ScriptTarget.ES2020, es2021: ts.ScriptTarget.ES2021, es2022: ts.ScriptTarget.ES2022, esnext: ts.ScriptTarget.ESNext }[(process.env.TARGET || '').toLowerCase()] ?? ts.ScriptTarget.ES2023, experimentalDecorators: true, emitDecoratorMetadata: !rest.includes('--no-metadata'), verbatimModuleSyntax: rest.includes('--verbatim'), useDefineForClassFields: useDefine, removeComments: true, esModuleInterop: interop, strictNullChecks: strict };
const TEMP = /^_[a-z]$|^_\d+$/;
function parse(code) {
  try { return acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'script', allowReturnOutsideFunction: true, allowHashBang: true }); }
  catch (e) { return acorn.parse(code, { ecmaVersion: 'latest', sourceType: 'module', allowReturnOutsideFunction: true, allowHashBang: true, allowAwaitOutsideFunction: true }); }
}
function norm(code) {
  const ast = parse(code);
  return JSON.stringify(ast, (k, v) => {
    if (k === 'start' || k === 'end' || k === 'raw') return undefined;
    if (typeof v === 'bigint') return v.toString() + 'n';
    if (v && v.type === 'Identifier' && TEMP.test(v.name)) return { type: 'Identifier', name: '_T' };
    if (v && v.type === 'ExpressionStatement' && v.directive) { const { directive, ...r } = v; return r; }
    return v;
  });
}
function firstDiff(a, b) { let i = 0; while (i < a.length && a[i] === b[i]) i++; return [a.slice(Math.max(0, i - 150), i + 150), b.slice(Math.max(0, i - 150), i + 150)]; }
let ok = 0, bad = 0, err = 0, tsErr = 0; const reasons = {};
files.forEach((f, i) => {
  const src = fs.readFileSync(f, 'utf8');
  let want;
  try { want = norm(ts.transpileModule(src, { fileName: f, compilerOptions: opts, reportDiagnostics: false }).outputText); } catch (e) { tsErr++; return; }
  const out = `${outdir}/${i}.js`;
  if (!fs.existsSync(out)) { err++; return; }
  let got;
  try { got = norm(fs.readFileSync(out, 'utf8')); } catch (e) { bad++; if (bad <= show) console.log(`PARSE FAIL ${f}: ${e.message}`); return; }
  if (got === want) { ok++; return; }
  bad++;
  if (bad <= show) { const [x, y] = firstDiff(want, got); console.log(`MISMATCH ${f}\n  tsc:    ${x}\n  ternts: ${y}`); }
});
console.log(`\n${ok} identical, ${bad} different, ${err} not transpiled (ternts error), ${tsErr} tsc/acorn failures, of ${files.length}`);
