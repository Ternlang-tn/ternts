# tests/

`harness/test.sh` (or `node tests/run.mjs`) runs everything in a few seconds; it builds
`main.tn` into a temp directory first (or tests `$TERNTS_BIN`).

| suite | what | expected output |
|---|---|---|
| `fixtures` | each `fixtures/<group>/*.ts(x)` through the binary's `--serve`, in every option set of the group's `options.json` | tsc 5.9 `transpileModule` with the same compilerOptions (`expected/<file>.<set>.js`), compared by AST |
| `wasm` | the same fixtures through `js/ternts.wasm` in-process (ternts/jest, the Vite plugin) | the same files |
| `project` | `ternts build -p` on each `project/<name>/` (a `node_modules.fixture/` becomes `node_modules/`, symlinks and all) | `tsc -p --noCheck` (`expected/`) |
| `cli` | where builds write, incremental rebuilds, flags, exit codes, source maps, the npm command's wasm fallback | assertions in `cli.mjs` |

Options: `--update` regenerates expected outputs (read the git diff: a changed tsc output is a
change in what ternts must match), `--build-wasm` rebuilds `js/ternts.wasm` and
`js/ternts-cli.wasm` (otherwise their tests skip when they're older than the sources),
`--corpus` adds the pinned NestJS corpus in every mode (`bench/setup.sh` first),
`--group=a,b` limits fixtures and projects.

A new tsc option (a `target`, say) is a new set in an `options.json`: its compilerOptions go to
ternts as a tsconfig and to tsc as they are. Known differences are marked, not hidden: a set's
`"pending"`, a file's `"known"` in `options.json` (optionally for some sets), `known.json` in a
project, `res.xfail` in `cli.mjs`. They're listed on every run, and one that starts passing
fails until its mark is removed. Put a new bug's repro in a file of its own so its mark
doesn't cover anything else.
