#!/usr/bin/env node
// fuzz.mjs: runs generated TypeScript programs compiled by ternts and by tsc's transpileModule
// and compares their behaviour; differences are shrunk and written to DIR. Exits 1 on any.
//   node harness/fuzz.mjs [--n N] [--seed S] [--bin TERNTS] [--targets es2015,es2022,...]
//                         [--out DIR] [--keep] [--text]
import fs from 'fs';
import os from 'os';
import path from 'path';
import vm from 'vm';
import { execFileSync } from 'child_process';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const H = path.dirname(fileURLToPath(import.meta.url));
const ts = createRequire(H + '/')('ts5');
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const N = +opt('--n', 200);
const SEED = +opt('--seed', Date.now() % 1e9);
const BIN = opt('--bin', process.env.TERNTS_BIN || path.join(H, '../ternts'));
const OUT = opt('--out', path.join(os.tmpdir(), 'ternts-fuzz'));
const TARGETS = opt('--targets', 'es2015,es2017,es2018,es2020,es2021,es2022,esnext').split(',');
const KEEP = args.includes('--keep');
const TEXT = args.includes('--text');

// ---- random

function rng(seed) {
  let s = seed >>> 0 || 1;
  const next = () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  return {
    f: next,
    i: (n) => Math.floor(next() * n),
    pick: (xs) => xs[Math.floor(next() * xs.length)],
    chance: (p) => next() < p,
  };
}

// ---- scenarios: each returns { code, async } for name suffix `u` (unique in the program)

const S = {};

// class fields, static blocks, #private, accessors, parameter properties, super
S.classes = (r, u) => {
  const L = [];
  const baseHas = { sx: r.chance(0.7), m: true, g: r.chance(0.5) };
  L.push(`class B${u} {`);
  if (baseHas.sx) L.push(`  static sx = ${r.i(9)};`);
  L.push(`  bx = ${r.i(9)};`);
  L.push(`  m(a: number = 1) { return "B.m" + a + this.bx; }`);
  L.push(`  static sm() { return "B.sm" + this.name.length; }`);
  if (baseHas.g) L.push(`  get g() { return "B.g" + this.bx; } set g(v: any) { this.bx = v; }`);
  L.push(`}`);
  const priv = r.chance(0.7);
  const spriv = r.chance(0.5);
  const pmeth = r.chance(0.5);
  const pacc = r.chance(0.4);
  const accKw = r.chance(0.3);
  const sblock = r.chance(0.5);
  const pprop = r.chance(0.4);
  L.push(`class D${u} extends B${u} {`);
  if (priv) L.push(`  #p = ${r.i(9)};`);
  if (spriv) L.push(`  static #sp = ${r.i(9)};`);
  L.push(`  dx = this.bx + ${r.i(5)};`);
  if (r.chance(0.5)) L.push(`  df = () => this.dx;`);
  L.push(`  static dsx = ${baseHas.sx ? 'super.sx + 1' : '7'};`);
  if (r.chance(0.5)) L.push(`  static dsy = this.dsx * 2;`);
  if (accKw) L.push(`  accessor ak = ${r.i(9)};`);
  if (accKw && r.chance(0.5)) L.push(`  static accessor sak = ${r.i(9)};`);
  if (pmeth) L.push(`  #pm(n: number) { return n * 2${priv ? ' + this.#p' : ''}; }`);
  if (pacc) L.push(`  get #pa() { return this.dx; } set #pa(v) { this.dx = v; }`);
  if (sblock) L.push(`  static { log("sblock${u}", this.dsx${spriv ? ', D' + u + '.#sp' : ''}); }`);
  if (pprop) L.push(`  constructor(public q: number = 3, private w?: string) { super(); log("ctor${u}", this.q, this.w, this.dx); }`);
  else if (r.chance(0.5)) L.push(`  constructor() { super(); log("ctor${u}", this.dx); }`);
  L.push(`  m(a: number = 2) { return "D.m(" + super.m(a) + ")"; }`);
  L.push(`  static sm() { return "D.sm(" + super.sm() + ")"; }`);
  const ops = [];
  if (priv) ops.push(`this.#p += 2; r.push(this.#p); r.push(this.#p++); r.push(++this.#p); r.push(#p in this);`);
  if (pmeth) ops.push(`r.push(this.#pm(3));`);
  if (pacc) ops.push(`this.#pa = 5; r.push(this.#pa); this.#pa += 1; r.push(this.#pa);`);
  if (spriv) ops.push(`D${u}.#sp *= 3; r.push(D${u}.#sp);`);
  if (baseHas.g) ops.push(`r.push(super.g); super.g = 4; r.push(this.bx);`);
  if (accKw) ops.push(`this.ak = this.ak + 1; r.push(this.ak);`);
  if (priv && r.chance(0.5)) ops.push(`const { a: x = this.#p } = { a: undefined as any }; r.push(x);`);
  if (priv && r.chance(0.3)) ops.push(`[this.#p] = [40]; r.push(this.#p);`);
  L.push(`  run() { const r: any[] = []; ${ops.join(' ')} return r; }`);
  L.push(`}`);
  L.push(`{ const d = new D${u}(); log("cls${u}", d.m(), D${u}.sm(), d.dx, D${u}.dsx, JSON.stringify(d.run()), Object.keys(d).join(",")); }`);
  return { code: L.join('\n') };
};

// super in static initializers and object literal methods
S.superStatic = (r, u) => {
  const L = [`class SA${u} { static a = ${r.i(9)}; static f() { return "SA.f:" + this.a; } }`];
  L.push(`class SC${u} extends SA${u} {`);
  const n = 1 + r.i(5);
  const forms = [
    `static z1 = super.a;`, `static z2 = super.f();`, `static z3 = super.a = 5;`, `static z4 = super.a += 2;`,
    `static z5 = super.a++;`, `static z6 = ++super.a;`, `static z7 = super["a"];`, `static z8 = [super.a] = [11];`,
    `static z9 = { x: super.a } = { x: 12 };`, `static { log("sb${u}", super.a, super.f()); }`,
    `static z10 = (() => super.f())();`, `static z11 = super.a ?? 3;`,
  ];
  for (let i = 0; i < n; i++) L.push('  ' + r.pick(forms));
  L.push(`}`);
  L.push(`log("ss${u}", JSON.stringify(Object.entries(SC${u})), SA${u}.a);`);
  if (r.chance(0.4)) {
    L.push(`{ const base${u} = { hi() { return "base-hi"; } }; const o${u} = { __proto__: base${u}, hi() { return "o:" + super.hi(); } }; log("objsuper${u}", o${u}.hi()); }`);
  }
  return { code: L.join('\n') };
};

// destructuring: rest, defaults, computed keys, nested, as values, in for-of and parameters
S.destructuring = (r, u) => {
  const L = [];
  const src = `{ a: 1, b: { c: 2, d: [3, 4, 5] }, e: undefined as any, [\`k${u}\`]: 6, z: 9 }`;
  const pats = [
    `{ a, ...rest }`, `{ b: { c, ...r2 }, ...r1 }`, `{ e = 10, ...r3 }`, `{ [\`k${u}\`]: kk, ...r4 }`,
    `{ b: { d: [x0, ...xs] }, z }`, `{ a: aa = 5, b: { d: [, y1 = 7] } }`, `{ q = 1, ...r5 }`,
  ];
  const p = r.pick(pats);
  const names = [...p.matchAll(/(?:\.\.\.|[{,]\s*|:\s*|\[\s*,?\s*)([a-z][a-z0-9]*)(?=\s*(?:[,}=\]]|$))/g)].map((m) => m[1]).filter((n) => !['a', 'b', 'd', 'e'].includes(n) || p.includes(n + ','));
  const shown = [...new Set(p.replace(/\[`[^`]*`\]:/g, '').match(/\b(rest|r1|r2|r3|r4|r5|c|kk|x0|xs|z|aa|y1|q|a|e)\b/g) || [])];
  L.push(`{ const ${p} = ${src}; log("ds${u}", JSON.stringify([${shown.join(', ')}])); }`);
  L.push(`{ let t: any; const v = (${p.replace(/\b(rest|r1|r2|r3|r4|r5|c|kk|x0|xs|z|aa|y1|q)\b/g, 't.$1').replace(/t\.(\w+) =/g, 't.$1 =')} = ${src}); }`.replace(/.*/, ''));
  L.push(`{ let o${u}: any = {}; let v${u} = ({ a: o${u}.a, ...o${u}.rest } = { a: 1, b: 2, c: 3 }); log("dsa${u}", JSON.stringify(o${u}), JSON.stringify(v${u})); }`);
  if (r.chance(0.5)) L.push(`{ const out: any[] = []; for (const { a, ...rr } of [{ a: 1, b: 2 }, { a: 3, c: 4 }]) out.push(a, JSON.stringify(rr)); log("dsf${u}", out.join("|")); }`);
  if (r.chance(0.5)) L.push(`{ function f${u}({ a = 1, ...rest }: any = {}, [b, ...cs]: any[] = [7, 8, 9]) { return JSON.stringify([a, rest, b, cs]); } log("dsp${u}", f${u}(), f${u}({ a: 2, x: 3 }, [4])); }`);
  if (r.chance(0.4)) L.push(`{ let i = 0; const order: any[] = []; const k = (n: any) => (order.push(n), n); const { [k("x")]: x = k("dx"), ...others } = { x: undefined, y: 2 } as any; log("dso${u}", order.join(","), x, JSON.stringify(others)); }`);
  return { code: L.filter(Boolean).join('\n') };
};

// ?. ?? ||= &&= ??= ** spread
S.operators = (r, u) => {
  const L = [`{ const o: any = { a: { b: () => 1, c: null as any }, n: 0, arr: [1, 2] }; let calls = 0; const f = () => (calls++, o);`];
  const exprs = [
    `f()?.a?.b()`, `f()?.a.c?.d`, `f()?.["a"]?.["b"]?.()`, `o.x?.y.z`, `f().n ?? 5`, `o.a.c ?? "dflt"`,
    `(o.n ||= 7)`, `(o.m ??= 8)`, `(o.a.c &&= 9)`, `(f().arr[0] **= 3)`, `2 ** 3 ** 2`, `({ ...o.a, z: 1 }).z`,
    `[...o.arr, ...[3]].length`, `delete f()?.a?.c`, `typeof o?.nope`, `(f()?.a).b()`, `o.arr?.[1]`,
  ];
  const n = 2 + r.i(5);
  const es = [];
  for (let i = 0; i < n; i++) es.push(r.pick(exprs));
  L.push(`  const vals: any[] = [${es.join(', ')}];`);
  L.push(`  log("op${u}", JSON.stringify(vals), calls, JSON.stringify(o)); }`);
  return { code: L.join('\n') };
};

// async functions, arrows, methods with super; async generators; for await
S.async = (r, u) => {
  const L = [];
  L.push(`class AB${u} { async v(n: number) { await null; return n + 1; } }`);
  L.push(`class AC${u} extends AB${u} {`);
  L.push(`  async v(n: number) { const a = await super.v(n); const f = async () => (await super.v(a)) + this.k; return f(); }`);
  L.push(`  k = 10;`);
  L.push(`  async *gen(n: number) { try { for (let i = 0; i < n; i++) { yield i; await null; } yield* [100, 101]; } finally { log("genfin${u}"); } }`);
  L.push(`}`);
  L.push(`async function run${u}() {`);
  L.push(`  const c = new AC${u}(); const out: any[] = [await c.v(1)];`);
  L.push(`  for await (const x of c.gen(${1 + r.i(3)})) { out.push(x); if (x === ${r.chance(0.5) ? 1 : 1000}) break; }`);
  if (r.chance(0.5)) L.push(`  try { await (async () => { throw new Error("boom${u}"); })(); } catch (e: any) { out.push(e.message); } finally { out.push("fin"); }`);
  if (r.chance(0.5)) L.push(`  const fa = async function (this: any, ...a: any[]) { await 0; return [arguments.length, a.length, typeof this]; }; out.push(JSON.stringify(await fa.call({}, 1, 2)));`);
  if (r.chance(0.5)) L.push(`  const ag = async function* () { const x = yield 1; out.push("got" + x); yield await Promise.resolve(2); }; const it = ag(); out.push(JSON.stringify(await it.next()), JSON.stringify(await it.next("X")), JSON.stringify(await it.next()));`);
  L.push(`  log("async${u}", JSON.stringify(out));`);
  L.push(`}`);
  return { code: L.join('\n'), call: `await run${u}();` };
};

// generators, labels, closures in loops, tagged templates, arguments, default params
S.control = (r, u) => {
  const L = [];
  L.push(`{ function* g${u}(n: number): any { for (let i = 0; i < n; i++) { const x = yield i; if (x) return x; } return "end"; } const it = g${u}(3); log("gen${u}", JSON.stringify([it.next(), it.next(), it.next("ret"), it.next()])); }`);
  L.push(`{ const fs: any[] = []; outer: for (let i = 0; i < 3; i++) { for (const j of [0, 1, 2]) { if (j === 2) continue outer; fs.push(() => i * 10 + j); } } log("loop${u}", fs.map((f) => f()).join(",")); }`);
  if (r.chance(0.5)) L.push(`{ const tag = (s: TemplateStringsArray, ...v: any[]) => JSON.stringify([s.raw, v]); log("tpl${u}", tag\`a\${1}b\\n\${"c"}\`); }`);
  if (r.chance(0.5)) L.push(`{ function f${u}(a: number, b = a + 1, ...c: number[]) { return [a, b, c.length, arguments.length].join(","); } log("args${u}", f${u}(1), f${u}(1, undefined, 3, 4)); }`);
  if (r.chance(0.4)) L.push(`{ let s = ""; for (const [k, v] of Object.entries({ x: 1, y: 2 })) s += k + v; for (const ch of "ab") s += ch; log("forof${u}", s); }`);
  return { code: L.join('\n') };
};

// using / await using: dispose order, errors
S.using = (r, u) => {
  const L = [];
  L.push(`function res${u}(n: string, fail = false) { return { [Symbol.dispose]() { log("dispose${u}", n); if (fail) throw new Error("dfail" + n); } }; }`);
  L.push(`function ares${u}(n: string) { return { async [Symbol.asyncDispose]() { await null; log("adispose${u}", n); } }; }`);
  const body = [];
  body.push(`using a = res${u}("a");`);
  if (r.chance(0.5)) body.push(`using b = res${u}("b", ${r.chance(0.4)});`);
  if (r.chance(0.3)) body.push(`using n = null;`);
  body.push(`log("inblock${u}");`);
  if (r.chance(0.3)) body.push(`throw new Error("body${u}");`);
  L.push(`function u${u}() { try { ${body.join(' ')} } catch (e: any) { log("caught${u}", e.message, e.name, e.error?.message, e.suppressed?.message); } }`);
  L.push(`u${u}();`);
  L.push(`async function au${u}() { { await using x = ares${u}("x"); using y = res${u}("y"); log("ablock${u}"); } }`);
  if (r.chance(0.4)) L.push(`{ const out: any[] = []; for (using q of [res${u}("q1"), res${u}("q2")]) out.push(1); log("forusing${u}", out.length); }`);
  if (r.chance(0.4)) L.push(`{ let k = 0; for (using q of [{ [Symbol.dispose]() { log("inline${u}", k++); } }, null]) log("iter${u}", k); }`);
  return { code: L.join('\n'), call: `await au${u}();`, needs: 'dispose' };
};

// legacy decorators (experimentalDecorators)
S.legacyDecorators = (r, u) => {
  const L = [];
  L.push(`function cd${u}(t: any) { log("classdec${u}", t.name); return t; }`);
  L.push(`function md${u}(t: any, k: string, d?: any) { log("memdec${u}", typeof t === "function" ? "static" : "proto", k, d ? Object.keys(d).sort().join("") : "none"); }`);
  L.push(`function pd${u}(t: any, k: string | undefined, i: number) { log("paramdec${u}", k, i); }`);
  L.push(`@cd${u} class LD${u} {`);
  L.push(`  @md${u} f = 1;`);
  L.push(`  @md${u} static sf = 2;`);
  L.push(`  @md${u} m(@pd${u} a: any) { return a; }`);
  L.push(`  @md${u} get g() { return 1; }`);
  L.push(`  constructor(@pd${u} x?: any) {}`);
  L.push(`}`);
  L.push(`log("ld${u}", new LD${u}().m(5), LD${u}.sf);`);
  return { code: L.join('\n'), legacy: true };
};

// TC39 decorators
S.tc39Decorators = (r, u) => {
  const L = [];
  L.push(`function d${u}(v: any, c: any) { log("tc39${u}", c.kind, String(c.name), c.static, c.private); if (c.addInitializer) c.addInitializer(function (this: any) { log("init${u}", c.kind, String(c.name)); }); if (c.kind === "method") return function (this: any, ...a: any[]) { return "wrapped:" + v.apply(this, a); }; if (c.kind === "field") return (x: any) => x * 10; }`);
  const classDec = r.chance(0.5);
  L.push(`${classDec ? '@d' + u + ' ' : ''}class TD${u} {`);
  const members = [
    `@d${u} m() { return "m"; }`, `@d${u} static sm() { return "sm"; }`, `@d${u} f = 2;`, `@d${u} static sf = 3;`,
    `@d${u} accessor a = 4;`, `@d${u} get g() { return "g"; }`, `@d${u} #pm() { return "pm"; }`, `@d${u} static #sp = 5;`,
  ];
  const chosen = [...new Set(Array.from({ length: 1 + r.i(5) }, () => r.pick(members)))];
  for (const m of chosen) L.push('  ' + m);
  const uses = [];
  if (chosen.some((m) => m.includes('#pm'))) uses.push(`this.#pm()`);
  if (chosen.some((m) => m.includes('#sp'))) uses.push(`TD${u}.#sp`);
  L.push(`  probe() { return [${uses.join(', ')}]; }`);
  L.push(`}`);
  L.push(`{ const t: any = new TD${u}(); log("td${u}", typeof t.m === "function" ? t.m() : "-", t.f, t.a, JSON.stringify(t.probe())); }`);
  return { code: L.join('\n'), legacy: false };
};

// enums and namespaces
S.enums = (r, u) => {
  const L = [];
  L.push(`enum E${u} { A, B = ${r.i(9)}, C, D = "d", F = B << 2, G = ~A }`);
  L.push(`namespace N${u} { export const x = ${r.i(9)}; export function f() { return x + 1; } export namespace Inner { export const y = f(); } }`);
  L.push(`namespace N${u} { export const z = x * 2; }`);
  L.push(`log("enum${u}", JSON.stringify(E${u}), N${u}.x, N${u}.f(), N${u}.Inner.y, N${u}.z);`);
  return { code: L.join('\n') };
};

// class expressions: statics, #private, named ones that refer to themselves
S.classExpr = (r, u) => {
  const L = [];
  L.push(`const CE${u} = class Named${u} { static s = ${r.i(9)}; static #h = ${r.i(9)}; #x = ${r.i(9)}; static get h() { return Named${u}.#h; } get x() { return this.#x; } static make() { return new Named${u}(); } };`);
  L.push(`const anon${u} = [class { static t = "t${u}"; static { (this as any).u = this.t + "!"; } }][0];`);
  L.push(`log("ce${u}", CE${u}.s, CE${u}.h, CE${u}.make().x, CE${u}.name, anon${u}.t, (anon${u} as any).u);`);
  return { code: L.join('\n') };
};

// optional chains with calls, privates, parentheses and delete
S.chains = (r, u) => {
  const L = [];
  L.push(`class K${u} { #f = (n: number) => n * 2; #o: any = { p: { q: () => "pq" } }; v = 5; m(x?: any) { return this.v + (x ?? 0); } run(o: any) { const out: any[] = [];`);
  const ex = [
    `this.#f?.(3)`, `this.#o?.p?.q()`, `this.#o?.nope?.q()`, `o?.m?.(1)`, `o?.a?.b`, `(o?.a)?.b`, `o?.["m"]?.(2)`,
    `o?.list?.[0]?.k`, `delete o?.gone?.x`, `o?.m(...[1])`, `this?.m?.(4)`, `o?.self?.m(o?.v)`,
  ];
  const n = 2 + r.i(5);
  for (let i = 0; i < n; i++) L.push(`    out.push(${r.pick(ex)});`);
  L.push(`    return out; } }`);
  L.push(`{ const k = new K${u}(); const o: any = { v: 1, m(n: number) { return this.v + n; }, a: { b: 7 }, list: [{ k: "k0" }], gone: { x: 1 } }; o.self = o; log("ch${u}", JSON.stringify(k.run(o)), JSON.stringify(k.run(null))); }`);
  return { code: L.join('\n') };
};

// object spread: order, getters, null/undefined, computed keys, __proto__
S.spread = (r, u) => {
  const L = [];
  L.push(`{ const order: string[] = []; const src = { get a() { order.push("a"); return 1; }, b: 2 }; const k = "c${u}";`);
  const forms = [`{ ...src }`, `{ x: 0, ...src, b: 3 }`, `{ ...null, ...undefined, ...src }`, `{ [k]: 1, ...src, [k + "2"]: 2 }`, `{ ...{ ...src, d: 4 }, e: 5 }`, `{ ...[1, 2] }`, `{ ...("ab" as any) }`];
  L.push(`  const v = ${r.pick(forms)}; log("sp${u}", JSON.stringify(v), order.join(""));`);
  L.push(`  const w = { ...src, get g() { return "g"; } }; log("sp2${u}", Object.keys(w).join(","), w.g); }`);
  return { code: L.join('\n') };
};

// destructuring evaluation order (keys, defaults, sources)
S.destrOrder = (r, u) => {
  const L = [`{ const ord: string[] = []; const t = (s: string, v?: any) => (ord.push(s), v);`];
  const forms = [
    `const { [t("k1", "a")]: a = t("d1", 1), [t("k2", "b")]: { c = t("d2", 2) } = t("d3", {}), ...rest } = t("src", { a: undefined, z: 9 } as any); log("do${u}", a, c, JSON.stringify(rest));`,
    `let x: any, y: any; ({ [t("k", "x")]: x = t("dx", 1), y = t("dy", 2) } = t("s", { y: 0 } as any)); log("do${u}", x, y);`,
    `const [p = t("p", 1), [q = t("q", 2)] = t("pq", []), ...more] = t("arr", [undefined]) as any; log("do${u}", p, q, JSON.stringify(more));`,
    `function f({ a = t("fa", 1), ...o }: any = t("fdef", { b: 2 })) { return [a, o]; } log("do${u}", JSON.stringify(f()), JSON.stringify(f({ a: 5 })));`,
  ];
  L.push('  ' + r.pick(forms));
  L.push(`  log("ord${u}", ord.join(",")); }`);
  return { code: L.join('\n') };
};

// static blocks, static #private, static async, super in statics
S.statics = (r, u) => {
  const L = [];
  L.push(`class SB${u} { static base = "B"; static who() { return "SB"; } }`);
  L.push(`class SD${u} extends SB${u} {`);
  L.push(`  static #n = ${r.i(5)};`);
  L.push(`  static #inc() { return ++SD${u}.#n; }`);
  L.push(`  static tag = super.who() + this.base;`);
  L.push(`  static { this.#inc(); log("sblk${u}", SD${u}.#n, super.base, this.tag); }`);
  L.push(`  static async later() { await null; return SD${u}.#inc() + (super.who() === "SB" ? 100 : 0); }`);
  L.push(`  static get n() { return this.#n; }`);
  L.push(`}`);
  L.push(`async function st${u}() { log("st${u}", await SD${u}.later(), SD${u}.n, SD${u}.tag); }`);
  return { code: L.join('\n'), call: `await st${u}();` };
};

// await in loops, try/finally, labels, conditionals
S.asyncFlow = (r, u) => {
  const L = [];
  L.push(`async function af${u}(xs: number[]) { const out: any[] = [];`);
  L.push(`  outer: for (const x of xs) { for (let i = 0; i < 3; i++) { if (i === x) continue outer; out.push(await Promise.resolve(x * 10 + i)); } }`);
  L.push(`  let j = 0; while ((await Promise.resolve(j)) < 2) { try { if (j === 1) throw new Error("e" + j); out.push("t" + j); } catch (e: any) { out.push(e.message); } finally { out.push("f" + j); j++; } }`);
  L.push(`  const v = (await 0) || (await Promise.resolve("v")); out.push(v, await (async () => this === undefined ? "u" : "this")());`);
  L.push(`  return out; }`);
  return { code: L.join('\n'), call: `log("af${u}", JSON.stringify(await af${u}([1, 2])));` };
};

// declaration merging: function/class + namespace, enum + namespace
S.merging = (r, u) => {
  const L = [];
  L.push(`function fm${u}() { return "fm"; } namespace fm${u} { export const extra = "x${u}"; }`);
  L.push(`class cm${u} { static s = 1; } namespace cm${u} { export const t = 2; }`);
  L.push(`enum em${u} { A = 1, B } namespace em${u} { export function nameOf(v: em${u}) { return em${u}[v]; } }`);
  L.push(`log("mg${u}", fm${u}(), fm${u}.extra, cm${u}.s, (cm${u} as any).t, em${u}.nameOf(em${u}.B));`);
  return { code: L.join('\n') };
};

// tagged templates (raw strings, cache identity) with lowering inside
S.templates = (r, u) => {
  const L = [];
  L.push(`{ const seen: any[] = []; const tag = (s: TemplateStringsArray, ...v: any[]) => { seen.push(s); return s.raw.join("|") + ":" + v.join(","); };`);
  L.push(`  const o: any = { a: { b: 2 } }; const f = () => tag\`x\${o?.a?.b}y\${o?.z ?? "d"}\\n\`;`);
  L.push(`  log("tpl${u}", f(), f() === f() ? "same" : "diff", seen[0] === seen[1]); }`);
  return { code: L.join('\n') };
};

S.privUpdate = (r, u) => {
  const L = [];
  L.push(`class PU${u} { #x = 1; static #s = 10; static n = 0; static get(o: PU${u}) { PU${u}.n++; return o; }`);
  L.push(`  run() { const o = this; PU${u}.get(o).#x++; ++PU${u}.get(o).#x; PU${u}.get(o).#x += 3; const v = PU${u}.get(o).#x++; PU${u}.#s++; PU${u}.#s **= 2;`);
  L.push(`    return [v, this.#x, PU${u}.#s, PU${u}.n]; } }`);
  return { code: L.join('\n'), call: `log("pu${u}", JSON.stringify(new PU${u}().run()));` };
};

S.agenNested = (r, u) => {
  const L = [];
  L.push(`async function* AG${u}(t: Promise<number>) { yield 1; const a = await (async () => (await t) + 1)();`);
  L.push(`  async function h() { return (await t) * 2; } const f = async (x: number) => await x;`);
  L.push(`  yield a; yield await h(); yield await f(7); for await (const z of [Promise.resolve(8)]) yield z; }`);
  L.push(`async function AGrun${u}() { const out: any[] = []; for await (const v of AG${u}(Promise.resolve(3))) out.push(v); return out; }`);
  return { code: L.join('\n'), call: `log("ag${u}", JSON.stringify(await AGrun${u}()));` };
};

S.asyncArgs = (r, u) => {
  const L = [];
  L.push(`function AA${u}(a: number, b: number) { const g = async () => arguments.length + ":" + arguments[0]; return g(); }`);
  L.push(`async function AB${u}(a: number, b = 2) { const g = async () => (async () => arguments[1])(); return g(); }`);
  return { code: L.join('\n'), call: `log("aa${u}", await AA${u}(5, 6), await (AB${u} as any)(1, 9));` };
};

S.privLoop = (r, u) => {
  const L = [];
  L.push(`{ const ks: any[] = []; for (let i = 0; i < 3; i++) { ks.push(class { #f = i; static #s = i * 10; #m() { return this.#f; } get() { return this.#m() + (this.constructor as any).sv(); } static sv() { return this.#s; } }); }`);
  L.push(`  let j = 0; while (j < 2) { ks.push(class { #g = j; get() { return this.#g; } }); j++; }`);
  L.push(`  log("pl${u}", ks.map((K) => new K().get()).join(",")); }`);
  return { code: L.join('\n') };
};

S.noSemi = (r, u) => {
  const L = [];
  L.push(`{ let n${u}: any = null`);
  L.push(`  const q${u} = {`);
  L.push(`    a: 1`);
  L.push(`  }`);
  L.push(`  n${u} ??= q${u}.a + 1`);
  L.push(`  let z${u} = { b: n${u} }`);
  L.push(`  z${u}.b ??= 5`);
  L.push(`  log("ns${u}", n${u}, z${u}.b, q${u}?.a) }`);
  return { code: L.join('\n') };
};

S.superOpt = (r, u) => {
  const L = [];
  L.push(`class SB${u} { tag = "b"; m?(x: number) { return this.tag + x; } }`);
  L.push(`class SD${u} extends SB${u} { tag = "d"; async a() { return super.m?.(1); } async b() { return super["m"]?.(2); } c() { return super.m?.(3); } }`);
  return { code: L.join('\n'), call: `{ const d = new SD${u}(); log("so${u}", await d.a(), await d.b(), d.c()); }` };
};

// CommonJS exports: exported variables updated in blocks, loops and functions; re-exports; string names
S.exports = (r, u) => {
  const L = [];
  const list = [];
  L.push(`export let xa${u} = 1;`);
  if (r.chance(0.6)) list.push(`xa${u} as xa2${u}`);
  L.push(`let xb${u} = 2;`);
  list.push(`xb${u}`);
  if (r.chance(0.5)) list.push(`xb${u} as "xb-${u}"`);
  L.push(`for (var xi${u} = 0; xi${u} < ${1 + r.i(3)}; xi${u}++) {}`);
  if (r.chance(0.7)) list.push(`xi${u}`);
  L.push(`for (var xk${u} in { p: 1, q: 2 }) ${r.chance(0.5) ? `{ xb${u}++; }` : `xb${u} += 1;`}`);
  if (r.chance(0.6)) list.push(`xk${u}`);
  L.push(`{ var xc${u} = 1; xc${u} = ${r.i(9)}; }`);
  if (r.chance(0.7)) list.push(`xc${u}`);
  L.push(`function xf${u}() { xa${u}++; let t = xb${u}++; return ++xa${u} + t; }`);
  L.push(`export enum XE${u} { A, B = ${r.i(9)} }`);
  if (r.chance(0.5)) list.push(`XE${u} as XE2${u}`);
  L.push(`export namespace XN${u} { export const v = ${r.i(9)}; }`);
  if (r.chance(0.5)) list.push(`XN${u} as XN2${u}`);
  L.push(`xa${u} = xa${u} + ${r.i(5)};`);
  L.push(`export { ${list.join(', ')} };`);
  if (r.chance(0.5)) L.push(`export { xb${u} as xb4${u} };`);
  return { code: L.join('\n'), call: `{ xf${u}(); const e: any = exports; log("ex${u}", JSON.stringify(Object.keys(e).filter((k) => k.includes("${u}")).sort().map((k) => [k, e[k]]))); }` };
};

// parameters after an object-rest parameter whose defaults read its names
S.restParamDefaults = (r, u) => {
  const L = [];
  L.push(`function rp${u}({ a, ...x }: any, b = a + 1, c = x.q ?? ${r.i(9)}) { return [a, b, c, x]; }`);
  L.push(`const ra${u} = (n = ${r.i(5)}, { a, ...x }: any = { a: n }, b = a * 2) => [n, a, b, x];`);
  return { code: L.join('\n'), call: `log("rp${u}", rp${u}({ a: ${r.i(9)}, q: ${r.chance(0.5) ? r.i(9) : 'undefined'} }), rp${u}({ a: 1 }, ${r.i(9)}), ra${u}(), ra${u}(${r.i(9)}, { a: ${r.i(9)}, z: 1 }));` };
};

// a class decorator that replaces the class, with static #private read through the class's name
S.tc39Replace = (r, u) => {
  const L = [];
  L.push(`function rep${u}(c: any, ctx: any) { return class extends c { static tag = "sub"; }; }`);
  L.push(`@rep${u}`);
  L.push(`class RD${u} {`);
  L.push(`  static #x = ${r.i(9)};`);
  if (r.chance(0.6)) L.push(`  static #m() { return RD${u}.#x + 1; }`);
  else L.push(`  static #m() { return 1; }`);
  if (r.chance(0.5)) L.push(`  static get #g() { return ${r.i(9)}; }`);
  else L.push(`  static get #g() { return 0; }`);
  L.push(`  static read() { return [RD${u}.#x, RD${u}.#m(), RD${u}.#g, (RD${u} as any).tag]; }`);
  L.push(`  #i = ${r.i(9)};`);
  L.push(`  inst() { return this.#i; }`);
  L.push(`}`);
  return { code: L.join('\n'), call: `{ let v: any; try { v = RD${u}.read(); } catch (e: any) { v = "throws " + e.constructor.name; } log("tr${u}", v, new RD${u}().inst()); }`, tc39: true };
};

// #private and super compound assignments with a lower-precedence right side (x.#a *= b + c)
S.privCompound = (r, u) => {
  const ops = ['*=', '-=', '/=', '%=', '<<=', '&=', '|=', '^=', '**=', '+=', '&&=', '||=', '??='];
  const rhs = [`b + c`, `b - c`, `c ? b : 2`, `b || c`, `b && c`, `b | c`, `b * c`, `(b, c)`];
  const L = [];
  L.push(`class PCB${u} { static s: any = 3; }`);
  L.push(`class PC${u} extends PCB${u} {`);
  const st = r.chance(0.5);                       // without a static #private: no class alias
  L.push(`  #a: any = ${r.i(9)};`);
  if (st) L.push(`  static #s: any = ${r.i(9)};`);
  const body = [];
  for (let i = 0; i < 4; i++) {
    const o = r.pick(ops);
    let e = r.pick(rhs);
    if ((o === '??=' || o === '||=' || o === '&&=') && (e === 'b || c' || e === 'b && c')) e = `(${e})`;
    body.push(`this.#a ${o} ${e};` + (st ? ` PC${u}.#s ${o} ${e};` : ''));
  }
  L.push(`  m(b: any, c: any) { ${body.join(' ')} return [this.#a${st ? `, PC${u}.#s` : ''}]; }`);
  const so = r.pick(['*=', '-=', '+=']);
  L.push(`  static t = (super.s ${so} ${r.pick(['1 + 2', '5 - 3', '2 * 3'])}, super.s);`);
  L.push(`}`);
  return { code: L.join('\n'), call: `log("pc${u}", new PC${u}().m(${r.i(5)}, ${r.i(5)}), PC${u}.t);` };
};

// random expressions mixing lowered forms with ordinary operators: lowering must keep grouping
S.precMix = (r, u) => {
  const atoms = [`o.a`, `o?.a`, `o?.n?.a`, `o.z ?? 2`, `(o.z ?? o.a)`, `2 ** o.a`, `this.#p`, `o?.f?.(1)`, `o.a`, `1`, `o.s ?? "s"`];
  const bins = ['+', '-', '*', '/', '%', '**', '<<', '>>', '&', '|', '^', '<', '>=', '==', '!==', '&&', '||', '??', ','];
  const gen = (d) => {
    if (d <= 0 || r.chance(0.3)) return r.pick(atoms);
    const k = r.i(6);
    const a = gen(d - 1), b = gen(d - 1);
    if (k === 0) return `(${a} ? ${b} : ${gen(d - 1)})`;
    if (k === 1) return `!${r.chance(0.5) ? '(' + a + ')' : 'o?.a'}`;
    if (k === 2) return `typeof ${r.chance(0.5) ? '(' + a + ')' : 'o?.a'}`;
    if (k === 3) return `[${a}, ${b}]`;
    let op = r.pick(bins);
    if (op === '??' && (/(&&|\|\|)/.test(a) || /(&&|\|\|)/.test(b))) op = '+';
    if ((op === '&&' || op === '||') && (/\?\?/.test(a) || /\?\?/.test(b))) op = '+';
    if (op === '**' && /^[-!~]|typeof/.test(a)) op = '*';
    return `(${a} ${op} ${b})`;
  };
  const L = [];
  L.push(`class PM${u} {`);
  L.push(`  #p: any = ${r.i(5)};`);
  const es = [];
  for (let i = 0; i < 4; i++) es.push(gen(3));
  const asg = r.pick(['||=', '&&=', '??=', '+=', '*=', '**=']);
  L.push(`  run(o: any) { const out: any[] = []; ${es.map((e) => `out.push(${e});`).join(' ')} o.q ${asg} ${gen(2)}; this.#p ${asg} ${gen(2)}; out.push(o.q, this.#p); return out; }`);
  L.push(`}`);
  return { code: L.join('\n'), call: `log("pm${u}", new PM${u}().run({ a: ${r.i(5)}, z: ${r.chance(0.5) ? 'null' : r.i(5)}, n: ${r.chance(0.5) ? 'null' : '{ a: 3 }'}, s: ${r.chance(0.5) ? 'undefined' : '"x"'}, f: ${r.chance(0.5) ? 'null' : '(x: any) => x + 1'}, q: ${r.chance(0.5) ? 0 : 'null'} }));` };
};

const NAMES = Object.keys(S);

// ---- programs

function program(seed) {
  const r = rng(seed);
  const legacy = r.chance(0.5);
  const parts = [];
  const k = 2 + r.i(4);
  for (let i = 0; i < k; i++) {
    let name = r.pick(NAMES);
    if (name === 'legacyDecorators' && !legacy) name = 'tc39Decorators';
    if (name === 'tc39Decorators' && legacy) name = 'legacyDecorators';
    if (name === 'tc39Replace' && legacy) name = 'legacyDecorators';
    parts.push({ name, ...S[name](r, `_${i}`) });
  }
  return { seed, legacy, parts };
}

function source(prog, keep = null) {
  const parts = keep ? prog.parts.filter((_, i) => keep.includes(i)) : prog.parts;
  const head = [
    `const __out: string[] = [];`,
    `function log(...a: any[]) { __out.push(a.map((x) => typeof x === "string" ? x : typeof x === "function" ? "fn:" + x.name : typeof x === "symbol" ? String(x) : JSON.stringify(x) ?? String(x)).join(" ")); }`,
  ];
  const body = parts.map((p) => p.code);
  const calls = parts.filter((p) => p.call).map((p) => p.call);
  const tail = [`async function __main() { ${calls.join(' ')} }`, `(globalThis as any).__done = __main().then(() => __out, (e: any) => (__out.push("MAIN THROWS " + e?.message), __out));`];
  return [...head, ...body, ...tail].join('\n') + '\nexport {};\n';
}

// ---- running

function compilerOptions(target, legacy) {
  // TC39-decorator programs use define semantics at every target
  return { target, module: 'commonjs', experimentalDecorators: legacy, useDefineForClassFields: target === 'es2022' || target === 'esnext' || !legacy, strict: false, noCheck: true, lib: ['esnext', 'dom'] };
}

function tscOut(src, co) {
  const { options } = ts.convertCompilerOptionsFromJson(co, '.');
  return ts.transpileModule(src, { fileName: 'a.ts', compilerOptions: options, reportDiagnostics: false }).outputText;
}

async function run(js) {
  const ctx = vm.createContext({ console: { log() {}, error() {} }, setTimeout, queueMicrotask });
  const module = { exports: {} };
  try {
    vm.runInContext(`(function (exports, module, require) {${js}\n})`, ctx, { timeout: 2000 })(module.exports, module, () => ({}));
    const out = await Promise.race([ctx.__done, new Promise((res) => setTimeout(() => res(['TIMEOUT']), 2000))]);
    return out.join('\n');
  } catch (e) {
    return 'THROWS ' + (e && e.constructor && e.constructor.name) + ': ' + (e && e.message);
  }
}

function ternts(progs, target, legacy, dir) {
  // one build of every program for these options
  const d = path.join(dir, `${target}-${legacy ? 'legacy' : 'tc39'}`);
  fs.rmSync(d, { recursive: true, force: true });
  fs.mkdirSync(path.join(d, 'src'), { recursive: true });
  for (const [id, src] of progs) fs.writeFileSync(path.join(d, 'src', id + '.ts'), src);
  fs.writeFileSync(path.join(d, 'tsconfig.json'), JSON.stringify({ compilerOptions: { ...compilerOptions(target, legacy), rootDir: 'src', outDir: 'out' }, include: ['src'] }));
  const res = new Map();
  try {
    execFileSync(BIN, ['build', '-p', 'tsconfig.json', '--force'], { cwd: d, stdio: ['ignore', 'ignore', 'pipe'] });
  } catch (e) { /* per-file errors: their outputs are missing */ }
  for (const [id] of progs) {
    const f = path.join(d, 'out', id + '.js');
    res.set(id, fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null);
  }
  return res;
}

async function main() {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fuzz-'));
  fs.mkdirSync(OUT, { recursive: true });
  const progs = Array.from({ length: N }, (_, i) => program(SEED + i));
  let fails = 0, textDiffs = 0, ran = 0, tscBugs = 0;
  const { norm } = await import(path.join(H, '../tests/lib.mjs'));
  for (const target of TARGETS) {
    for (const legacy of [true, false]) {
      const group = progs.filter((p) => p.legacy === legacy);
      if (!group.length) continue;
      const co = compilerOptions(target, legacy);
      const srcs = group.map((p) => [`p${p.seed}`, source(p)]);
      const outs = ternts(srcs, target, legacy, tmp);
      for (const p of group) {
        const id = `p${p.seed}`;
        const src = source(p);
        const want = tscOut(src, co);
        const got = outs.get(id);
        ran++;
        if (got == null) { fails++; report(p, target, legacy, 'ternts error', want, ''); continue; }
        const [a, b] = [await run(want), await run(got)];
        if (a !== b) {
          // unlowered tsc output as referee: if ternts matches it, the bug is tsc's
          const ref = await run(tscOut(src, compilerOptions('esnext', legacy)));
          if (b === ref && a !== ref) { tscBugs++; continue; }
          fails++;
          const keep = await shrink(p, target, legacy, co, tmp);
          report(p, target, legacy, `behaves differently:\n--- tsc\n${a}\n--- ternts\n${b}\n--- tsc esnext\n${ref}`, want, got, keep);
        } else if (TEXT) {
          try { if (norm(want) !== norm(got)) textDiffs++; } catch { }
        }
      }
    }
  }
  if (!KEEP) fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`fuzz: seed ${SEED}, ${N} programs x ${TARGETS.length} targets: ${ran} runs, ${fails} behaving differently from tsc${tscBugs ? `, ${tscBugs} where tsc differs from its own ESNext output (not counted)` : ''}${TEXT ? `, ${textDiffs} alike but different text` : ''}`);
  process.exit(fails ? 1 : 0);
}

// The fewest scenarios that still behave differently.
async function shrink(p, target, legacy, co, tmp) {
  let keep = p.parts.map((_, i) => i);
  const differs = async (k) => {
    const src = source(p, k);
    const outs = ternts([[`s${p.seed}`, src]], target, legacy, tmp);
    const got = outs.get(`s${p.seed}`);
    if (got == null) return true;
    return (await run(tscOut(src, co))) !== (await run(got));
  };
  for (let i = keep.length - 1; i >= 0 && keep.length > 1; i--) {
    const k = keep.filter((_, j) => j !== i);
    if (await differs(k)) keep = k;
  }
  return keep;
}

function report(p, target, legacy, what, want, got, keep = null) {
  const id = `${p.seed}-${target}-${legacy ? 'legacy' : 'tc39'}`;
  const src = source(p, keep);
  const names = (keep ? keep.map((i) => p.parts[i]) : p.parts).map((x) => x.name).join(', ');
  fs.writeFileSync(path.join(OUT, id + '.ts'), `// ${target}, ${legacy ? 'experimentalDecorators' : 'TC39 decorators'}; scenarios: ${names}\n// ${what.split('\n').join('\n// ')}\n${src}`);
  if (keep) {
    fs.writeFileSync(path.join(OUT, id + '.tsc.js'), tscOut(src, compilerOptions(target, legacy)));
  }
  console.log(`FAIL ${id} [${names}] -> ${path.join(OUT, id + '.ts')}`);
}

main();
