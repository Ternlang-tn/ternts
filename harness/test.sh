#!/bin/sh
# test.sh [suite...] [--update] [--corpus] [--build-wasm] [--group=a,b]: runs tests/run.mjs.
set -e
H="$(cd "$(dirname "$0")" && pwd)"
[ -d "$H/node_modules/ts5" ] || (cd "$H" && npm ci --silent)
exec node "$H/../tests/run.mjs" "$@"
