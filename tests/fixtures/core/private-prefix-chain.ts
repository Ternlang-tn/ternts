// ++this.#p in a file with an optional chain (whose lowering captures operands): the prefix
// operator reaches the #private access (it wrote ++__classPrivateFieldGet(...))
class D {
  #p = 3;
  run() { const r: any[] = []; r.push(++this.#p); r.push(this.#p++); r.push(--this.#p); return r; }
}
declare const e: any;
const m = e?.message;
