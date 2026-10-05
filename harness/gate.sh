#!/bin/bash
# gate.sh [BIN]: the pre-commit checks, stopping at the first failure: tests, conformance
# baseline, perf gate, and corpus output identical to tsc. BIN defaults to a fresh build.
set -o pipefail
H="$(cd "$(dirname "$0")" && pwd)"
ROOT="$H/.."
BIN=${1:-}
if [ -z "$BIN" ]; then
  BIN=$(mktemp -d)/ternts
  (cd "$ROOT" && tern build main.tn -o "$BIN") || { echo "gate: build failed"; exit 1; }
fi
step() { echo "gate: $1"; }
fail() { echo "gate: FAIL: $1"; exit 1; }

out=$(TERNTS_BIN="$BIN" node "$ROOT/tests/run.mjs" 2>&1) || true
echo "$out" | grep -q "all passed" || { echo "$out" | grep -E "^FAIL" | head; fail "tests"; }
step "tests pass"

out=$(node "$H/tsconformance.mjs" --bin "$BIN" --baseline "$H/tsconformance-baseline.txt" 2>&1) || true
echo "$out" | grep -q "REGRESSED" && { echo "$out" | grep -A8 REGRESSED; fail "conformance"; }
step "$(echo "$out" | grep -E "^baseline:")"

out=$("$H/perfgate.sh" 2>&1 | tail -1)
echo "$out" | grep -q FAIL && fail "$out"
step "$out"

C=${CORPUS:-$HOME/ternts-corpus}
for t in "" es2015; do
  for l in nest react; do
    [ -f "$C/$l.txt" ] || continue
    r=$(cd "$C" && TARGET=$t TERNTS="$BIN" "$H/tsrun.sh" $l.txt 2>&1 | grep identical)
    echo "$r" | grep -q " 0 different" || fail "$l ${t:-default}: $r"
    step "$l ${t:-default}: $r"
  done
done
echo "gate: all passed"
