// fixtures.mjs: per-file output. Each tests/fixtures/<group>/ has inputs (.ts .tsx .mts .cts)
// and options.json:
//
//   { "about": "...", "expect": "tsc" | "snapshot",
//     "sets": { "<name>": { <tsconfig compilerOptions>, "files": [only these], "ternts": { flags },
//                           "pending": "why" } },
//     "known": { "<file>": "why" | { "why": "...", "sets": [...] }, "<file> [<set>]": "why" } }
//
// A set's compilerOptions go on DEFAULTS (lib.mjs); ternts gets them as a tsconfig.json (its
// --serve -p server, as the Vite/Jest hooks use it) and tsc 5.9 through transpileModule, so a
// new option (a target, say) is a new set and nothing else. "ternts" flags have no tsc
// equivalent (importMetaCjs, jestHoist): such groups use "expect": "snapshot", ternts' own
// reviewed output. "pending" (a set) and "known" (a file, or a file in one set) are known bugs:
// run and reported, not failures; one that starts passing fails until its mark is removed.
// Expected outputs: <group>/expected/<file>.<set>.js, written by --update.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { TESTS, ROOT, DEFAULTS, tmpdir, wasmState, tscTranspile, same, diff, pretty, Results } from './lib.mjs';

const require = createRequire(import.meta.url);
const INPUT = /\.(ts|tsx|mts|cts)$/;

// known["file"] is a reason, or { "why": reason, "sets": [the sets it applies to] }
function knownFor(known, f, set) {
  const k = known[`${f} [${set}]`] ?? known[f];
  if (k === undefined || typeof k === 'string') return k;
  return !k.sets || k.sets.includes(set) ? k.why : undefined;
}

function failOrKnown(res, name, pending, detail) {
  if (pending) res.xfail(name, false, pending); else res.fail(name, detail);
}

export function groups() {
  const dir = path.join(TESTS, 'fixtures');
  return fs.readdirSync(dir).filter((g) => fs.existsSync(path.join(dir, g, 'options.json'))).sort();
}

// engine 'native': the binary's --serve (js/client.cjs); 'wasm': js/ternts.wasm in-process
// (js/wasm.cjs, what ternts/jest and the Vite plugin run), the same expected outputs.
export async function runFixtures({ bin, update = false, only = null, engine = 'native' }) {
  const res = new Results(engine === 'wasm' ? 'wasm' : 'fixtures');
  if (engine === 'wasm' && wasmState('ternts.wasm')) {
    res.skip('all', `js/ternts.wasm is ${wasmState('ternts.wasm')}: run with --build-wasm`);
    return res;
  }
  const { transpiler } = require(path.join(ROOT, 'js', engine === 'wasm' ? 'wasm.cjs' : 'client.cjs'));
  const tmp = tmpdir('fixtures');
  for (const g of groups()) {
    if (only && !only.includes(g)) continue;
    const gdir = path.join(TESTS, 'fixtures', g);
    const spec = JSON.parse(fs.readFileSync(path.join(gdir, 'options.json'), 'utf8'));
    const expect = spec.expect ?? 'tsc';
    const known = spec.known ?? {};
    const inputs = fs.readdirSync(gdir).filter((f) => INPUT.test(f) && !f.endsWith('.d.ts')).sort();
    fs.mkdirSync(path.join(gdir, 'expected'), { recursive: true });
    for (const [set, raw] of Object.entries(spec.sets)) {
      const { files, ternts: flags = {}, pending: setPending, ...co } = raw;
      const compilerOptions = { ...DEFAULTS, ...co };
      const cfgDir = path.join(tmp, `${g}-${set}`);
      fs.mkdirSync(cfgDir, { recursive: true });
      const project = path.join(cfgDir, 'tsconfig.json');
      fs.writeFileSync(project, JSON.stringify({ compilerOptions }, null, 2));
      const t = engine === 'wasm' ? transpiler({ project, ...flags }) : transpiler({ bin, project, ...flags });
      // node16..nodenext: transpileModule writes a .ts file as CommonJS (no package.json says otherwise)
      // (no module: ES2015 for an ES2015+ target, as tsc defaults it)
      const esm = compilerOptions.module ? /^(es|preserve)/i.test(compilerOptions.module) : !/^es[35]$/i.test(compilerOptions.target ?? 'es5');
      for (const f of inputs) {
        if (files && !files.includes(f)) continue;
        const pending = setPending ?? knownFor(known, f, set);
        const name = `${g}/${f} [${set}]`;
        const src = fs.readFileSync(path.join(gdir, f), 'utf8');
        const expFile = path.join(gdir, 'expected', `${f}.${set}.js`);
        let got = null, err = '';
        try { got = t.transform(src, f, { esm }).code; }
        catch (e) { err = e.message; }
        // a crash is never a known difference (a known mark covers output, not ternts dying)
        if (got === null && /ternts exited|runtime error/.test(err)) { res.fail(name, `  ternts crashed: ${err}`); continue; }
        if (got === null && (!update || expect === 'snapshot')) { failOrKnown(res, name, pending, `  ternts: ${err}`); continue; }
        if (update && engine === 'native') {
          const want = expect === 'snapshot' ? got : tscTranspile(src, f, compilerOptions);
          if (!fs.existsSync(expFile) || fs.readFileSync(expFile, 'utf8') !== want) {
            fs.writeFileSync(expFile, want);
            console.log(`wrote ${path.relative(ROOT, expFile)}`);
          }
        }
        if (!fs.existsSync(expFile)) { res.fail(name, `  no expected output (run with --update)`); continue; }
        if (got === null) { failOrKnown(res, name, pending, `  ternts: ${err}`); continue; }
        const want = fs.readFileSync(expFile, 'utf8');
        const ok = same(want, got, { jsxPreserve: compilerOptions.jsx === 'preserve', fileName: f });
        if (pending) res.xfail(name, ok, pending);
        else if (ok) res.pass();
        else res.fail(name, `  (${expect === 'tsc' ? 'tsc' : 'snapshot'} -, ternts +)\n${diff(await pretty(want), await pretty(got))}`);
      }
    }
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  return res;
}
