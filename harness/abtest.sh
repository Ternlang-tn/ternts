#!/bin/bash
# abtest.sh APPDIR: build with tsc and ternts, then run requests.txt against both and diff.
APP=$1; PORT=${PORT:-3000}; shift
cd "$APP"
TSC=${TSC:-$(dirname $0)/node_modules/ts5/bin/tsc}
rm -rf dist-tsc dist-ternts
node $TSC -p tsconfig.json --noCheck --outDir dist-tsc --sourceMap false --declaration false --incremental false --tsBuildInfoFile /dev/null >/dev/null 2>&1 || node $TSC -p tsconfig.json --noCheck --outDir dist-tsc --sourceMap false --declaration false >/dev/null 2>&1
"$(cd "$(dirname "$0")" && pwd)/../ternts" build src dist-ternts "$@" --no-spec
[ -d dist-tsc/src ] && TSCMAIN=dist-tsc/src/main.js || TSCMAIN=dist-tsc/main.js
for v in tsc ternts; do
  if [ $v = tsc ]; then M=$TSCMAIN; else M=dist-ternts/main.js; fi
  node $M > ${TMPDIR:-/tmp}/abtest-$v.log 2>&1 & PID=$!
  for i in $(seq 1 50); do curl -s localhost:$PORT >/dev/null 2>&1 && break; sleep 0.1; done
  : > ${TMPDIR:-/tmp}/abtest-$v.out
  while read -r method path body; do
    if [ -n "$body" ]; then r=$(curl -s -X $method localhost:$PORT$path -H 'content-type: application/json' -d "$body"); else r=$(curl -s -X $method localhost:$PORT$path); fi
    r=$(echo "$r" | sed -E "s/eyJ[A-Za-z0-9_.-]+/<jwt>/g; s/[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9:.]+Z/<date>/g; s/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/<uuid>/g"); echo "$method $path -> $r" >> ${TMPDIR:-/tmp}/abtest-$v.out
  done < requests.txt
  kill $PID; wait $PID 2>/dev/null
done
if diff ${TMPDIR:-/tmp}/abtest-tsc.out ${TMPDIR:-/tmp}/abtest-ternts.out >/dev/null; then echo "IDENTICAL ($(wc -l < ${TMPDIR:-/tmp}/abtest-tsc.out) requests)"; else echo DIFFERENT; diff ${TMPDIR:-/tmp}/abtest-tsc.out ${TMPDIR:-/tmp}/abtest-ternts.out | head; fi
cat ${TMPDIR:-/tmp}/abtest-ternts.out | cut -c1-150
