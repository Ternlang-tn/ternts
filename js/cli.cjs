#!/usr/bin/env node
// The npm `ternts` command: runs this platform's native binary, or else ternts-cli.wasm under
// Node's WASI (no dev, --watch or --serve). TERNTS_CLI=wasm forces the WebAssembly build.
'use strict';
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { findBin } = require('./client.cjs');

const args = process.argv.slice(2);
const version = () => {   // (the package's; in a checkout, npm/package.json)
  for (const p of ['../package.json', '../npm/package.json']) {
    try { return require(p).version; } catch {}
  }
  return 'dev';
};
if (args.length === 1 && (args[0] === '--version' || args[0] === '-v')) {
  process.stdout.write(version() + '\n');
  process.exit(0);
}
if (args.length === 0 || (args.length === 1 && (args[0] === '--help' || args[0] === '-h'))) {
  process.stdout.write(`ternts ${version()}: TypeScript to JavaScript, as tsc emits it

  ternts build [-p tsconfig.json] [--watch]   the project in tsconfig.json
  ternts build SRC OUT [--esm]                a directory, without a tsconfig
  ternts dev [--warm] [-- CMD...]             build, run, and rebuild + restart on save
  ternts IN.ts [OUT.js]                       one file

https://ternlang.dev/ts/
`);
  process.exit(0);
}
const bin = process.env.TERNTS_CLI === 'wasm' ? null : findBin(undefined, true);
if (!bin) process.exit(runWasm(args));
const r = spawnSync(bin, args, { stdio: 'inherit' });
if (r.error) {
  process.stderr.write(`ternts: can't run ${bin}: ${r.error.message}\n`);
  process.exit(1);
}
if (r.signal) process.kill(process.pid, r.signal);
process.exit(r.status ?? 1);

// Preopens / on POSIX; on Windows each drive as /c, /d, ... (C:\proj\x.ts is /c/proj/x.ts).
function runWasm(argv) {
  const wasm = path.join(__dirname, 'ternts-cli.wasm');
  if (!fs.existsSync(wasm)) {
    process.stderr.write(`ternts: no native binary for ${process.platform}-${process.arch} ` +
      `(there are builds for darwin-arm64, darwin-x64, linux-arm64 and linux-x64), and no ${wasm}.\n`);
    return 1;
  }
  const win = process.platform === 'win32';
  const toWasi = (p) => {
    if (!win) return p;
    const m = /^([A-Za-z]):[\\/]?(.*)$/.exec(p);
    const rest = (m ? m[2] : p).replace(/\\/g, '/');
    return m ? `/${m[1].toLowerCase()}/${rest}` : rest;
  };
  let wasiArgs = argv;
  if (win) {
    // paths in arguments and @files (one argument per line) become WASI paths
    wasiArgs = [];
    for (const a of argv) {
      if (a.startsWith('@')) {
        for (const line of fs.readFileSync(a.slice(1), 'utf8').split(/\r?\n/)) if (line) wasiArgs.push(toWasi(line));
      } else {
        wasiArgs.push(toWasi(a));
      }
    }
  }
  const preopens = {};
  if (win) {
    for (const d of 'CDEFGHIJKLMNOPQRSTUVWXYZ') if (fs.existsSync(`${d}:\\`)) preopens[`/${d.toLowerCase()}`] = `${d}:\\`;
  } else {
    preopens['/'] = '/';
  }
  // silence node:wasi's ExperimentalWarning on every run
  const emit = process.emitWarning;
  process.emitWarning = function (w, ...rest) {
    const type = typeof rest[0] === 'string' ? rest[0] : rest[0] && rest[0].type;
    if ((type === 'ExperimentalWarning' || (w && w.name === 'ExperimentalWarning')) && /WASI/i.test(String(w && w.message || w))) return;
    return emit.call(process, w, ...rest);
  };
  let WASI;
  try {
    ({ WASI } = require('node:wasi'));
  } catch (e) {
    process.stderr.write(`ternts: this Node has no WASI (${e.message}); use Node 20 or later\n`);
    return 1;
  }
  const wasi = new WASI({
    version: 'preview1',
    args: ['ternts', ...wasiArgs],
    env: { ...process.env, TERNTS_PWD: toWasi(process.cwd()) },
    preopens,
    returnOnExit: true,
  });
  const instance = new WebAssembly.Instance(new WebAssembly.Module(fs.readFileSync(wasm)), wasi.getImportObject());
  return wasi.start(instance);
}
