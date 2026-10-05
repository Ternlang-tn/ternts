// project.mjs: whole-program builds. Each tests/project/<name>/ is a small project (tsconfig.json
// with rootDir src and outDir dist); `ternts build -p tsconfig.json` must write what
// `tsc -p tsconfig.json --noCheck` writes (expected/, by --update), by AST, file for file.
// A node_modules.fixture/ directory becomes node_modules/ in the temp copy the build runs in
// (it may hold symlinks, as pnpm lays packages out); known.json ({ "file": "why" }) marks known
// differences.
import fs from 'node:fs';
import path from 'node:path';
import { TESTS, TSC, tmpdir, same, diff, pretty, walk, run, Results } from './lib.mjs';

function copyProject(src, dst) {
  fs.cpSync(src, dst, { recursive: true, verbatimSymlinks: true, filter: (p) => path.basename(p) !== 'expected' && path.basename(p) !== 'known.json' });
  const nm = path.join(dst, 'node_modules.fixture');
  if (fs.existsSync(nm)) fs.renameSync(nm, path.join(dst, 'node_modules'));
}

export async function runProjects({ bin, update = false, only = null }) {
  const res = new Results('project');
  const root = path.join(TESTS, 'project');
  const tmp = tmpdir('project');
  for (const name of fs.readdirSync(root).filter((d) => fs.existsSync(path.join(root, d, 'tsconfig.json'))).sort()) {
    if (only && !only.includes(name)) continue;
    const dir = path.join(root, name);
    const known = fs.existsSync(path.join(dir, 'known.json')) ? JSON.parse(fs.readFileSync(path.join(dir, 'known.json'), 'utf8')) : {};
    const expected = path.join(dir, 'expected');
    if (update) {
      const t = path.join(tmp, `${name}-tsc`);
      copyProject(dir, t);
      const r = run(process.execPath, [TSC, '-p', 'tsconfig.json', '--noCheck'], { cwd: t });
      if (r.status !== 0) { res.fail(`${name} (tsc)`, r.stdout + r.stderr); continue; }
      fs.rmSync(expected, { recursive: true, force: true });
      fs.cpSync(path.join(t, 'dist'), expected, { recursive: true });
      console.log(`wrote tests/project/${name}/expected (${walk(expected).length} files)`);
    }
    const t = path.join(tmp, name);
    copyProject(dir, t);
    const r = run(bin, ['build', '-p', 'tsconfig.json', '--force'], { cwd: t });
    if (r.status !== 0) { res.fail(name, `  ternts build exited ${r.status}:\n${r.stdout}${r.stderr}`); continue; }
    const want = walk(expected).filter((f) => f.endsWith('.js'));
    const got = walk(path.join(t, 'dist')).filter((f) => f.endsWith('.js'));
    if (want.length === 0) { res.fail(name, '  no expected output (run with --update)'); continue; }
    const missing = want.filter((f) => !got.includes(f)), extra = got.filter((f) => !want.includes(f));
    res.check(`${name}: files`, missing.length === 0 && extra.length === 0, `  missing: ${missing.join(' ') || '-'}; extra: ${extra.join(' ') || '-'}`);
    for (const f of want) {
      if (!got.includes(f)) continue;
      const w = fs.readFileSync(path.join(expected, f), 'utf8');
      const g = fs.readFileSync(path.join(t, 'dist', f), 'utf8');
      const ok = same(w, g);
      const label = `${name}/${f}`;
      if (known[f]) res.xfail(label, ok, known[f]);
      else if (ok) res.pass();
      else res.fail(label, `  (tsc -p -, ternts build +)\n${diff(await pretty(w), await pretty(g))}`);
    }
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  return res;
}
