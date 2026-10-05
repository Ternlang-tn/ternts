#!/bin/bash
# tsrun.sh LIST [--esm --interop --strict --define]   (TARGET=es2015 .. esnext: default es2023)
# Compares ternts' output ASTs for every file in LIST with tsc's transpileModule.
H="$(cd "$(dirname "$0")" && pwd)"; LIST=$1; shift
O=$(mktemp -d); ${TERNTS:-$H/../ternts} --target=${TARGET:-es2023} "$@" --outdir $O @$LIST 2> $O/err.txt   # tscheck.mjs reads TARGET too
echo "ternts errors: $(wc -l < $O/err.txt)"; head -5 $O/err.txt
node $H/tscheck.mjs $LIST $O "$@" ${SHOW:+--show $SHOW}; rm -rf $O
