// Runs TypeScript in Node through ternts, including decorator metadata that type stripping can't do.
//   node --import @ternlang/ternts/register src/main.ts
// Uses module.registerHooks so import and require both work synchronously.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire, registerHooks } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const { transpiler } = require('./engine.cjs').engine();
const { compilerOptions } = require('./tsconfig.cjs');

if (typeof registerHooks !== 'function') {
  throw new Error('@ternlang/ternts/register needs Node 22.15 or later (module.registerHooks)');
}

function findUp(dir, name) {
  for (;;) {
    const p = path.join(dir, name);
    if (fs.existsSync(p)) return p;
    const up = path.dirname(dir);
    if (up === dir) return null;
    dir = up;
  }
}

const tsconfig = process.env.TERNTS_TSCONFIG ? path.resolve(process.env.TERNTS_TSCONFIG) : findUp(process.cwd(), 'tsconfig.json');
// importMetaCjs: .ts files Node loads as CommonJS have no import.meta
const t = transpiler(tsconfig ? { project: tsconfig, importMetaCjs: true } : { importMetaCjs: true });

// tsconfig "paths": [[prefix, suffix, [targets with one *]]], relative to baseUrl (or the tsconfig).
const co = tsconfig ? compilerOptions(tsconfig) : {};
const base = tsconfig ? path.resolve(path.dirname(tsconfig), co.baseUrl || '.') : process.cwd();
const paths = Object.entries(co.paths || {}).map(([pattern, targets]) => {
  const star = pattern.indexOf('*');
  return star < 0 ? [pattern, null, targets] : [pattern.slice(0, star), pattern.slice(star + 1), targets];
});

const TS = /\.(c|m)?tsx?$/;
const typeOf = new Map();                  // directory -> "module" | "commonjs"
function packageType(dir) {
  if (typeOf.has(dir)) return typeOf.get(dir);
  let type = 'commonjs';
  const pj = path.join(dir, 'package.json');
  if (fs.existsSync(pj)) {
    try { type = JSON.parse(fs.readFileSync(pj, 'utf8')).type === 'module' ? 'module' : 'commonjs'; } catch {}
  } else if (path.dirname(dir) !== dir) {
    type = packageType(path.dirname(dir));
  }
  typeOf.set(dir, type);
  return type;
}

// The .ts file a failed specifier meant, if there is one.
function tsCandidates(p) {
  const m = /\.(c|m)?jsx?$/.exec(p);
  if (m) {
    const stem = p.slice(0, -m[0].length);
    return [stem + m[0].replace('js', 'ts'), stem + '.tsx'];
  }
  return [p + '.ts', p + '.tsx', p + '.mts', p + '.cts', path.join(p, 'index.ts'), path.join(p, 'index.tsx')];
}
function firstFile(list) {
  for (const f of list) {
    try { if (fs.statSync(f).isFile()) return f; } catch {}
  }
  return null;
}

function resolve(specifier, context, nextResolve) {
  try {
    return nextResolve(specifier, context);
  } catch (err) {
    if (err.code !== 'ERR_MODULE_NOT_FOUND' && err.code !== 'MODULE_NOT_FOUND') throw err;
    let found = null;
    const parent = context.parentURL && context.parentURL.startsWith('file:') ? fileURLToPath(context.parentURL) : path.join(process.cwd(), 'x');
    if (specifier.startsWith('.') || specifier.startsWith('/') || specifier.startsWith('file:')) {
      const p = specifier.startsWith('file:') ? fileURLToPath(specifier) : path.resolve(path.dirname(parent), specifier);
      found = firstFile(tsCandidates(p));
    } else {
      for (const [prefix, suffix, targets] of paths) {
        let rest = null;
        if (suffix === null) rest = specifier === prefix ? '' : null;
        else if (specifier.startsWith(prefix) && specifier.endsWith(suffix) && specifier.length >= prefix.length + suffix.length) {
          rest = specifier.slice(prefix.length, specifier.length - suffix.length);
        }
        if (rest === null) continue;
        for (const target of targets) {
          const p = path.resolve(base, target.replace('*', rest));
          found = firstFile([p, ...tsCandidates(p)]);
          if (found) break;
        }
        if (found) break;
      }
    }
    if (!found) throw err;
    return { url: pathToFileURL(found).href, shortCircuit: true };
  }
}

function load(url, context, nextLoad) {
  if (!url.startsWith('file:')) return nextLoad(url, context);
  const file = fileURLToPath(url);
  if (!TS.test(file) || file.endsWith('.d.ts')) return nextLoad(url, context);
  const format = file.endsWith('.mts') ? 'module' : file.endsWith('.cts') ? 'commonjs' : packageType(path.dirname(file));
  const src = fs.readFileSync(file, 'utf8');
  const { code, map } = t.transform(src, file, { esm: format === 'module', sourceMap: true });
  const inline = map ? '\n//# sourceMappingURL=data:application/json;base64,' + Buffer.from(JSON.stringify(map)).toString('base64') : '';
  return { format, source: code + inline, shortCircuit: true };
}

registerHooks({ resolve, load });
process.setSourceMapsEnabled(true);
