// Synchronous transpiles through a `ternts --serve` process, for hooks that must return at once.
// A worker thread owns the server; the caller blocks on Atomics.wait for the reply.
//   const { code, map } = require('@ternlang/ternts/client').transpiler({ project }).transform(src, file, { esm, sourceMap });
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { Worker, MessageChannel, receiveMessageOnPort } = require('node:worker_threads');

// The ternts binary: given, $TERNTS_BIN, ../ternts, the platform package, else PATH (null if strict).
function findBin(bin, strict = false) {
  if (bin) return bin;
  if (process.env.TERNTS_BIN) return process.env.TERNTS_BIN;
  const local = path.join(__dirname, '..', 'ternts');
  if (fs.existsSync(local) && fs.statSync(local).isFile()) return local;
  try { return require.resolve(`@ternlang/ternts-${process.platform}-${process.arch}/ternts`); } catch {}
  return strict ? null : 'ternts';
}

function serverArgs(o) {
  return ['--serve',
    ...(o.project ? ['-p', o.project] : []),
    ...(o.useDefineForClassFields ? ['--define'] : []),
    ...(o.interop ? ['--interop'] : []),
    ...(o.strict ? ['--strict'] : []),
    ...(o.importMetaCjs ? ['--import-meta-cjs'] : []),
    ...(o.jestHoist ? ['--jest-hoist'] : []),
    ...(o.target ? ['--target=' + o.target] : []),
    ...(o.jsx ? [`--jsx=${o.jsx}`] : []),
    ...(o.jsxImportSource ? [`--jsx-import-source=${o.jsxImportSource}`] : []),
    ...(o.jsxFactory ? [`--jsx-factory=${o.jsxFactory}`] : []),
    ...(o.jsxFragment ? [`--jsx-fragment=${o.jsxFragment}`] : [])];
}

// The worker: one server process, replies in request order.
const WORKER = `
const { workerData } = require('node:worker_threads');
const { spawn } = require('node:child_process');
const { bin, args, port, flag } = workerData;
let proc = null, buf = Buffer.alloc(0);
const queue = [];
function reply(msg) { port.postMessage(msg); Atomics.store(flag, 0, 1); Atomics.notify(flag, 0); }
function start() {
  proc = spawn(bin, args, { stdio: ['pipe', 'pipe', 'inherit'] });
  proc.on('error', (e) => { for (const q of queue.splice(0)) reply({ error: 'ternts: ' + e.message }); proc = null; });
  proc.on('exit', (c) => { for (const q of queue.splice(0)) reply({ error: 'ternts exited (' + c + ')' }); proc = null; });
  proc.stdout.on('data', (d) => { buf = buf.length ? Buffer.concat([buf, d]) : d; drain(); });
}
function drain() {
  while (queue.length) {
    const nl = buf.indexOf(10);
    if (nl < 0) return;
    const [e, c, m = 0] = buf.subarray(0, nl).toString().split(' ').map(Number);
    const end = nl + 1 + e + c + m + 1;
    if (buf.length < end) return;
    const err = buf.subarray(nl + 1, nl + 1 + e).toString();
    const code = buf.subarray(nl + 1 + e, nl + 1 + e + c).toString();
    const map = m ? buf.subarray(end - 1 - m, end - 1).toString() : null;
    buf = buf.subarray(end);
    queue.shift();
    reply(err ? { error: err } : { code, map });
  }
}
port.on('message', ({ src, file, esm, sourceMap }) => {
  if (!proc) start();
  queue.push(1);
  const b = Buffer.from(src);
  proc.stdin.write((esm ? '1 ' : '0 ') + b.length + (sourceMap ? ' 1 ' : ' 0 ') + file + '\\n');
  proc.stdin.write(b);
});
`;

const servers = new Map();

function transpiler(options = {}) {
  const bin = findBin(options.bin);
  const args = serverArgs(options);
  const key = bin + '\0' + args.join('\0');
  if (servers.has(key)) return servers.get(key);
  let worker = null, port = null, flag = null;
  function start() {
    const ch = new MessageChannel();
    flag = new Int32Array(new SharedArrayBuffer(4));
    worker = new Worker(WORKER, { eval: true, workerData: { bin, args, port: ch.port2, flag }, transferList: [ch.port2] });
    worker.unref();
    port = ch.port1;
    port.unref();
  }
  const t = {
    // throws a SyntaxError on a syntax error
    transform(src, file, { esm = false, sourceMap = false } = {}) {
      if (!worker) start();
      Atomics.store(flag, 0, 0);
      port.postMessage({ src, file: file.replace(/\n/g, ' '), esm, sourceMap });
      if (Atomics.wait(flag, 0, 0, 120000) === 'timed-out') throw new Error(`ternts: no reply for ${file} in 120 s`);
      const r = receiveMessageOnPort(port).message;
      if (r.error !== undefined) {
        const e = new SyntaxError(`${file}:${r.error}`);
        if (/^ternts( exited|:)/.test(r.error)) { worker.terminate(); worker = null; }
        throw e;
      }
      let map = null;
      if (r.map) { map = JSON.parse(r.map); map.sources = [file]; map.file = path.basename(file); }
      return { code: r.code, map };
    },
  };
  servers.set(key, t);
  return t;
}

module.exports = { transpiler, findBin };
