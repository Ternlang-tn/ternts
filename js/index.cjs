// require('@ternlang/ternts'): TypeScript to JavaScript as tsc emits it, via WebAssembly or the native binary.
//   const { code, map } = require('@ternlang/ternts').transform(src, 'src/a.ts', { project: 'tsconfig.json', esm: true, sourceMap: true });
'use strict';
const path = require('node:path');
const { engine } = require('./engine.cjs');

function transpiler(options = {}) {
  const { engine: e, ...o } = options;
  if (o.project) o.project = path.resolve(o.project);
  return engine(e).transpiler(o);
}

function transform(src, file, options = {}) {
  const { esm, sourceMap, ...o } = options;
  return transpiler(o).transform(src, file, { esm, sourceMap });
}

module.exports = { transform, transpiler };
