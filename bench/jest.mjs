// jest.mjs: Jest's transform step, ternts/jest vs @swc/jest vs ts-jest, on the NestJS repo.
//   node bench/jest.mjs            (after bench/setup.sh and bench/dev.mjs, which installs them)
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const B = path.dirname(fileURLToPath(import.meta.url));
const APP = path.join(B, 'out/dev-app');
const require = createRequire(path.join(APP, 'package.json'));
const CORPUS = path.join(B, 'corpus/nest');
if (!fs.existsSync(path.join(APP, 'node_modules/@swc/jest'))) { console.error('run bench/setup.sh and node bench/dev.mjs first'); process.exit(1); }

const files = fs.readdirSync(CORPUS, { recursive: true })
  .filter(f => f.endsWith('.ts') && !f.endsWith('.d.ts') && !f.split(path.sep).includes('node_modules'))
  .map(f => path.join(CORPUS, f)).sort();
const srcs = files.map(f => [f, fs.readFileSync(f, 'utf8')]);
const bytes = srcs.reduce((n, [, s]) => n + s.length, 0);

const tsconfig = path.join(B, 'out/jest-tsconfig.json');
fs.writeFileSync(tsconfig, JSON.stringify({ compilerOptions: {
  module: 'commonjs', target: 'es2023', experimentalDecorators: true, emitDecoratorMetadata: true,
  useDefineForClassFields: false, sourceMap: true, isolatedModules: true, skipLibCheck: true, noCheck: true,
} }));
const config = { rootDir: CORPUS, cwd: CORPUS, globals: {}, moduleFileExtensions: ['ts', 'js'], testMatch: [], testRegex: [], extensionsToTreatAsEsm: [], transform: [], transformIgnorePatterns: [] };
const options = (transformerConfig) => ({ config, configString: JSON.stringify(config), cacheFS: new Map(), instrument: false, supportsDynamicImport: true, supportsExportNamespaceFrom: true, supportsStaticESM: false, supportsTopLevelAwait: true, transformerConfig });

const TOOLS = [
  ['**ternts/jest**', () => {
    const cfg = { tsconfig };
    return [require(path.join(B, '..', 'js', 'jest.cjs')).createTransformer(cfg), cfg];
  }],
  ['@swc/jest', () => {
    const cfg = { jsc: { target: 'es2022', parser: { syntax: 'typescript', decorators: true }, transform: { legacyDecorator: true, decoratorMetadata: true, useDefineForClassFields: false } }, module: { type: 'commonjs' } };
    return [require('@swc/jest').createTransformer(cfg), cfg];
  }],
  ['ts-jest (isolatedModules)', () => {
    const cfg = { tsconfig, isolatedModules: true, diagnostics: false };
    const m = require('ts-jest');
    return [(m.default || m).createTransformer(cfg), cfg];
  }],
];

const results = [];
for (const [name, make] of TOOLS) {
  const [t, cfg] = make();
  const opts = options(cfg);
  const times = [];
  let fails = 0;
  for (let r = 0; r < 3; r++) {
    fails = 0;
    const t0 = performance.now();
    for (const [f, s] of srcs) {
      try { const out = t.process(s, f, opts); if (!out || typeof (out.code ?? out) !== 'string') fails++; } catch { fails++; }
    }
    times.push(performance.now() - t0);
  }
  console.error(`${name}: first ${Math.round(times[0])} ms, best ${Math.round(Math.min(...times))} ms, ${fails} failed`);
  results.push({ name, first: times[0], best: Math.min(...times), fails });
}

const ms = x => x >= 1000 ? `${(x / 1000).toFixed(2)} s` : `${Math.round(x)} ms`;
const base = results[0];
const cell = (r, k) => r === base ? `**${ms(r[k])}**` : `${ms(r[k])} (${(r[k] / base[k]).toFixed(1)}x)`;
const ver = p => JSON.parse(fs.readFileSync(path.join(APP, 'node_modules', p, 'package.json'), 'utf8')).version;
let md = `Jest transform of the NestJS repo (${files.length.toLocaleString('en')} files, ${(bytes / 1e6).toFixed(1)} MB), one worker, with source maps. ` +
  `@swc/jest ${ver('@swc/jest')} (swc ${ver('@swc/core')}), ts-jest ${ver('ts-jest')} (TypeScript ${ver('typescript')}), Node ${process.version}.\n\n`;
md += '| | first pass (cold) | steady (best of 3) |\n|---|---|---|\n';
for (const r of results) md += `| ${r.name} | ${cell(r, 'first')} | ${cell(r, 'best')}${r.fails ? `, ${r.fails} failed` : ''} |\n`;
fs.writeFileSync(path.join(B, 'out/jest-results.md'), md);
console.log(md);
process.exit(0);
