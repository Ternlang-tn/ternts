// A Jest transformer: TypeScript through ternts; ES module .js/.mjs files become CommonJS.
//   transform: { '^.+\\.(t|j|mj)sx?$': ['@ternlang/ternts/jest', { tsconfig: 'tsconfig.json' }] }
'use strict';
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { engine } = require('./engine.cjs');

const TS = /\.(c|m)?tsx?$/;
const JS = /\.(c|m)?jsx?$/;
const LOOKS_ESM = /^\s*(import\s*[\w{*'"]|export(\s|[{*]))|[;}]\s*export\s*[{*]/m;

function binStamp(bin) {
  for (const p of [path.join(__dirname, 'ternts.wasm'), bin, path.join(__dirname, '..', 'ternts')]) {
    try { const s = fs.statSync(p); return `${s.size}:${s.mtimeMs}`; } catch {}
  }
  return 'path';
}

function createTransformer(cfg = {}) {
  const resolved = new Map();          // rootDir -> options
  function options(config) {
    const root = (config && config.rootDir) || process.cwd();
    if (!resolved.has(root)) {
      const { tsconfig, ...o } = cfg;
      // Jest runs CommonJS, which has no import.meta
      if (o.importMetaCjs === undefined) o.importMetaCjs = true;
      // jest.mock(...) above the requires, as babel-jest / @swc/jest / ts-jest do
      if (o.jestHoist === undefined) o.jestHoist = true;
      const p = tsconfig === false ? null : path.resolve(root, tsconfig || 'tsconfig.json');
      if (p && fs.existsSync(p)) o.project = p;
      o.stamp = p && fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';   // (for the cache key)
      resolved.set(root, o);
    }
    return resolved.get(root);
  }
  const stamp = binStamp(cfg.bin || process.env.TERNTS_BIN);

  function process_(src, file, opts) {
    if (file.endsWith('.d.ts')) return { code: '' };
    const esm = !!(opts && opts.supportsStaticESM);
    if (JS.test(file) && !TS.test(file) && (esm || !LOOKS_ESM.test(src))) return { code: src };
    const { stamp: _, engine: e, ...o } = options(opts && opts.config);
    // Plain JS is only made CommonJS, with JS class-field semantics and interop, as babel-jest does.
    const js = !TS.test(file);
    const t = engine(e).transpiler(js ? { useDefineForClassFields: true, interop: true, importMetaCjs: true } : o);
    const r = t.transform(src, file, { esm, sourceMap: true });
    return { code: r.code, map: r.map };
  }

  return {
    canInstrument: false,
    getCacheKey(src, file, opts) {
      return crypto.createHash('sha1')
        .update('ternts-jest 1\0').update(stamp).update('\0')
        .update(JSON.stringify(options(opts && opts.config))).update('\0')
        .update(String(!!(opts && opts.supportsStaticESM))).update('\0')
        .update(file).update('\0').update(src)
        .digest('hex');
    },
    process: process_,
    processAsync: async (src, file, opts) => process_(src, file, opts),
  };
}

module.exports = { createTransformer };
