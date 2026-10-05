#!/bin/bash
# setup.sh: fetches the corpora and pinned tools and builds ./ternts for run.mjs. Idempotent.
set -euo pipefail
B="$(cd "$(dirname "$0")" && pwd)"; R="$B/.."

clone() {  # clone NAME URL SHA: shallow fetch of exactly one commit
  local d="$B/corpus/$1"
  if [ "$(git -C "$d" rev-parse HEAD 2>/dev/null)" = "$3" ]; then echo "$1: at $3"; return; fi
  echo "$1: fetching $3"
  mkdir -p "$d"; git -C "$d" init -q
  git -C "$d" fetch -q --depth 1 "$2" "$3"
  git -C "$d" -c advice.detachedHead=false checkout -q FETCH_HEAD
}
clone nest   https://github.com/nestjs/nest.git       8843023c7a8d41c04ade7984cd5877122782512f
clone vscode https://github.com/microsoft/vscode.git  e3b106e75692789a68d03aade3a7ff03d554f621

(cd "$R/harness" && npm ci --no-audit --no-fund --loglevel=error)

if ! command -v tern >/dev/null; then
  echo "error: \`tern\` is not on PATH. Install Tern (./install.sh in the Tern repo), then rerun." >&2
  exit 1
fi
(cd "$R" && tern build main.tn -o ternts)
# the in-process wasm engine for the JS integrations (optional; needs Tern's wasm toolchain)
(cd "$R" && tern build --lib --target wasm wasm.tn -o js/ternts.wasm && rm -f js/ternts.mjs js/ternts.d.ts) ||
  echo "note: no wasm toolchain; the JS integrations will run ./ternts as a process"
echo "ready: node bench/run.mjs"
