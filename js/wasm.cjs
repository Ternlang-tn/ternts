// ternts.wasm loaded synchronously and run in this thread; same interface as ternts/client.
// The tsconfig is read here, since the wasm library has no file access.
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { compilerOptions } = require('./tsconfig.cjs');

let lib = null;

// The few WASI calls a Tern library makes; everything else returns ENOSYS.
function wasi(memory) {
  const ENOSYS = 52, EBADF = 8;
  const view = () => new DataView(memory().buffer);
  const fns = {
    fd_write(fd, iovs, n, written) {
      const v = view();
      let total = 0;
      for (let i = 0; i < n; i++) {
        const p = v.getUint32(iovs + i * 8, true), len = v.getUint32(iovs + i * 8 + 4, true);
        if (fd === 1 || fd === 2) process.stderr.write(Buffer.from(memory().buffer, p, len));
        total += len;
      }
      v.setUint32(written, total, true);
      return 0;
    },
    fd_fdstat_get(fd, stat) {
      if (fd > 2) return EBADF;
      const v = view();
      v.setUint8(stat, 2);
      v.setUint16(stat + 2, 0, true);
      v.setBigUint64(stat + 8, 0n, true);
      v.setBigUint64(stat + 16, 0n, true);
      return 0;
    },
    environ_sizes_get(count, size) { const v = view(); v.setUint32(count, 0, true); v.setUint32(size, 0, true); return 0; },
    environ_get: () => 0,
    args_sizes_get(count, size) { const v = view(); v.setUint32(count, 0, true); v.setUint32(size, 0, true); return 0; },
    args_get: () => 0,
    clock_time_get(id, precision, time) {
      view().setBigUint64(time, id === 0 ? BigInt(Date.now()) * 1000000n : process.hrtime.bigint(), true);
      return 0;
    },
    clock_res_get(id, res) { view().setBigUint64(res, 1000n, true); return 0; },
    random_get(buf, len) { require('node:crypto').randomFillSync(new Uint8Array(memory().buffer, buf, len)); return 0; },
    fd_close: () => 0, sched_yield: () => 0,
    proc_exit(code) { throw new Error(`ternts.wasm exited (${code})`); },
  };
  return new Proxy(fns, { get: (t, k) => t[k] || (() => ENOSYS) });
}

function load() {
  if (lib) return lib;
  const bytes = fs.readFileSync(path.join(__dirname, 'ternts.wasm'));
  const module = new WebAssembly.Module(bytes);
  let memory = null;
  const instance = new WebAssembly.Instance(module, { wasi_snapshot_preview1: wasi(() => memory) });
  const x = instance.exports;
  memory = x.memory;
  if (x._initialize) x._initialize();
  const put = (s) => {
    const b = Buffer.from(s, 'utf8');
    const p = x.tern_alloc(BigInt(b.length + 1));
    const m = new Uint8Array(memory.buffer, p, b.length + 1);
    m.set(b);
    m[b.length] = 0;
    return p;
  };
  lib = {
    // "<err bytes> <code bytes> <map bytes>\n" err code map, read by length
    transpile(src, file, esm, map, options) {
      const ps = [put(src), put(file), put(options)];
      let r;
      try { r = x.transpile(ps[0], ps[1], esm ? 1 : 0, map ? 1 : 0, ps[2]); }
      finally { for (const p of ps) x.tern_free(p); }
      const err = x.tern_last_error();
      if (err) {
        const m = new Uint8Array(memory.buffer);
        let e = err;
        while (m[e]) e++;
        throw new Error('ternts: ' + Buffer.from(m.subarray(err, e)).toString());
      }
      const m = new Uint8Array(memory.buffer);
      let nl = r;
      while (m[nl] !== 10) nl++;
      const [e, c, s] = Buffer.from(m.subarray(r, nl)).toString().split(' ').map(Number);
      const body = Buffer.from(m.subarray(nl + 1, nl + 1 + e + c + s));   // a copy
      x.tern_free(r);
      return [body.toString('utf8', 0, e), body.toString('utf8', e, e + c), s ? body.toString('utf8', e + c) : ''];
    },
  };
  return lib;
}

const cache = new Map();

function transpiler(options = {}) {
  const co = options.project ? compilerOptions(options.project) : {};
  const opts = { ...co };
  if (options.project) opts.$project = true;       // else ternts' defaults, as the CLI's
  if (options.useDefineForClassFields) opts.$define = true;
  if (options.interop) opts.$interop = true;
  if (options.strict) opts.$strict = true;
  if (options.importMetaCjs) opts.$importMetaCjs = true;
  if (options.jestHoist) opts.$jestHoist = true;
  if (options.target) opts.$target = String(options.target);
  const json = JSON.stringify(opts);
  if (cache.has(json)) return cache.get(json);
  const t = {
    transform(src, file, { esm = false, sourceMap = false } = {}) {
      // strings cross into wasm NUL-terminated, so swap NULs for an unused character and back
      let stand = null;
      if (src.includes('\0')) {
        for (let k = 0xF0000; stand === null || src.includes(stand); k++) stand = String.fromCodePoint(k);
        src = src.split('\0').join(stand);
      }
      let [err, code, map] = load().transpile(src, file, esm, sourceMap, json);
      if (stand) code = code.split(stand).join('\0');
      if (err) throw new SyntaxError(`${file}:${err}`);
      let m = null;
      if (map) { m = JSON.parse(map); m.sources = [file]; m.file = path.basename(file); }
      return { code, map: m };
    },
  };
  cache.set(json, t);
  return t;
}

module.exports = { transpiler };
