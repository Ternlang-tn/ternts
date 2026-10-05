// Vite/Vitest plugin: TypeScript and TSX through ternts, with source maps.
// Options: tsconfig (default: Vite root's tsconfig.json; false: none), engine, bin, and ternts flags.
import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);

export default function ternts(options = {}) {
  let t = null;
  function make(root) {
    const { tsconfig, engine, ...o } = options;
    const p = tsconfig === false ? null : resolve(root, tsconfig || 'tsconfig.json');
    if (p && existsSync(p)) o.project = p;
    return require('./engine.cjs').engine(engine).transpiler(o);
  }
  return {
    name: 'ternts',
    enforce: 'pre',
    configResolved(config) { t ??= make(config.root); },
    transform(code, id) {
      const file = id.split('?')[0];
      if (!/\.(ts|tsx|mts|cts)$/.test(file) || file.endsWith('.d.ts') || file.includes('/node_modules/')) return null;
      t ??= make(process.cwd());
      return t.transform(code, file, { esm: true, sourceMap: true });
    },
  };
}
