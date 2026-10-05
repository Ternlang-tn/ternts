#!/bin/bash
# perfgate.sh [REF] [MAX_PCT] [MAX_MEM_PCT]: fail if the working tree retires more instructions
# or uses more peak memory than REF (default HEAD) on the Nest corpus.
# Counts instructions rather than time because they barely move with machine load.
set -euo pipefail
H="$(cd "$(dirname "$0")" && pwd)"; R="$H/.."
REF="${1:-HEAD}"; MAX="${2:-0.5}"; MAXMEM="${3:-2}"
T="$(mktemp -d)"; trap 'rm -rf "$T"' EXIT
[ -d "$R/bench/corpus/nest" ] || { echo "perfgate: no corpus: run bench/setup.sh" >&2; exit 2; }
find "$R/bench/corpus/nest" -name '*.ts' ! -name '*.d.ts' | sort > "$T/all"
head -1500 "$T/all" > "$T/list"            # not piped: head closing early fails the pipeline

mkdir "$T/ref"; git -C "$R" archive "$REF" | tar -x -C "$T/ref"
(cd "$T/ref" && tern build main.tn -o "$T/ref.bin" >/dev/null)
(cd "$R" && tern build main.tn -o "$T/tree.bin" >/dev/null)
[ -s "$T/list" ] || { echo "perfgate: no .ts files in the corpus" >&2; exit 2; }

count() {  # "instructions peak-RSS-bytes" of one run
  if [ "$(uname)" = Darwin ]; then
    /usr/bin/time -l "$1" --bench 100 @"$T/list" 2>&1 >/dev/null | awk '/instructions retired/{i=$1} /peak memory footprint/{m=$1} END{print i, m}'
  else
    /usr/bin/time -f "RSS %M" perf stat -x, -e instructions:u "$1" --bench 100 @"$T/list" 2>&1 >/dev/null | awk -F'[, ]' '/instructions/{i=$1} /^RSS/{m=$2*1024} END{print i, m}'
  fi
}
ref=""; tree=""; ref_m=""; tree_m=""
for i in 1 2 3 4 5; do
  read a am <<< "$(count "$T/ref.bin")"; read b bm <<< "$(count "$T/tree.bin")"
  [ -z "$ref" ] || [ "$a" -lt "$ref" ] && ref=$a
  [ -z "$tree" ] || [ "$b" -lt "$tree" ] && tree=$b
  [ -z "$ref_m" ] || [ "$am" -lt "$ref_m" ] && ref_m=$am
  [ -z "$tree_m" ] || [ "$bm" -lt "$tree_m" ] && tree_m=$bm
done
pct=$(awk -v a="$ref" -v b="$tree" 'BEGIN{printf "%.2f", (b - a) / a * 100}')
mpct=$(awk -v a="$ref_m" -v b="$tree_m" 'BEGIN{printf "%.2f", (b - a) / a * 100}')
echo "perfgate: $REF $ref, tree $tree instructions ($pct%; limit +$MAX%); peak memory $((ref_m / 1048576)) -> $((tree_m / 1048576)) MB ($mpct%; limit +$MAXMEM%)"
awk -v p="$pct" -v m="$MAX" 'BEGIN{exit !(p <= m)}' || { echo "perfgate: FAIL: slower than $REF" >&2; exit 1; }
awk -v p="$mpct" -v m="$MAXMEM" 'BEGIN{exit !(p <= m)}' || { echo "perfgate: FAIL: more memory than $REF" >&2; exit 1; }
