import fs from 'fs';
import { transformSync } from '@swc/core';
import ts from 'ts5';
import * as esbuild from 'esbuild';
const [tool, list] = process.argv.slice(2);
const files = fs.readFileSync(list, 'utf8').split('\n').filter(Boolean).map(f => [f, fs.readFileSync(f, 'utf8')]);
const tsopts = { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2021, experimentalDecorators: true, emitDecoratorMetadata: true, useDefineForClassFields: false, removeComments: true, esModuleInterop: false } };
const swcopts = { module: { type: 'commonjs' }, jsc: { target: 'es2021', parser: { syntax: 'typescript', decorators: true, dynamicImport: true }, transform: { legacyDecorator: true, decoratorMetadata: true, useDefineForClassFields: false }, keepClassNames: true }, minify: false, sourceMaps: false, swcrc: false, configFile: false };
function run(src, f) {
  if (tool === 'swc') return transformSync(src, { ...swcopts, filename: f }).code;
  if (tool === 'tsc') return ts.transpileModule(src, { ...tsopts, fileName: f }).outputText;
  if (tool === 'esbuild') return esbuild.transformSync(src, { loader: 'ts', format: 'cjs', target: 'es2021', tsconfigRaw: { compilerOptions: { experimentalDecorators: true, useDefineForClassFields: false } } }).code;
}
let best = Infinity, bytes = 0, fails = 0, total = 0;
for (let r = 0; r < +(process.env.REPS || 5); r++) {
  const t0 = performance.now(); bytes = 0; fails = 0;
  for (const [f, src] of files) { try { bytes += run(src, f).length; } catch (e) { fails++; } }
  best = Math.min(best, performance.now() - t0);
}
for (const [, s] of files) total += s.length;
console.log(`${tool}\t${files.length} files\t${total} bytes in\t${bytes} out\t${fails} failed\t${best.toFixed(0)} ms\t${(total / best / 1e3).toFixed(1)} MB/s`);
