// preservecheck.mjs LIST OUTDIR: checks `--jsx=preserve` output: tsc(react-jsx) of it must
// equal tsc(react-jsx) of the source, by AST.
import fs from 'fs';
import * as acorn from 'acorn';
import ts from 'ts5';
const [list, outdir] = process.argv.slice(2);
const files = fs.readFileSync(list, 'utf8').split('\n').filter(Boolean);
const opts = { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2023, experimentalDecorators: true, emitDecoratorMetadata: true, removeComments: true, useDefineForClassFields: false };
const norm = c => JSON.stringify(acorn.parse(c, { ecmaVersion: 'latest', sourceType: 'module', allowAwaitOutsideFunction: true, allowReturnOutsideFunction: true }), (k, v) => (k === 'start' || k === 'end' || k === 'raw') ? undefined : (typeof v === 'bigint' ? v.toString() : v));
let ok = 0, bad = 0, err = 0;
files.forEach((f, i) => {
  const out = `${outdir}/${i}.js`;
  if (!fs.existsSync(out)) { err++; return; }
  try {
    const want = norm(ts.transpileModule(fs.readFileSync(f, 'utf8'), { fileName: f, compilerOptions: opts }).outputText);
    const got = norm(ts.transpileModule(fs.readFileSync(out, 'utf8'), { fileName: f, compilerOptions: opts }).outputText);
    if (want === got) ok++; else { bad++; if (bad <= 5) console.log('MISMATCH ' + f); }
  } catch (e) { bad++; if (bad <= 5) console.log('FAIL ' + f + ' ' + e.message); }
});
console.log(`${ok} identical, ${bad} different, ${err} not transpiled, of ${files.length}`);
