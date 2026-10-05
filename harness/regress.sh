#!/bin/bash
# regress.sh LIST...: the tsc AST check for each file list in every option set (SHOW=1 lists diffs).
H="$(cd "$(dirname "$0")" && pwd)"
for L in "$@"; do
  for m in "" "--esm" "--interop --strict" "--define"; do
    out=$(SHOW=${SHOW:+100000} $H/tsrun.sh "$L" $m 2>&1)
    printf '%-14s %-20s %s\n' "$(basename "$L")" "[${m:-cjs}]" "$(echo "$out" | grep identical)"
    [ -n "$SHOW" ] && echo "$out" | grep -E '^(MISMATCH|PARSE FAIL)'
  done
done
