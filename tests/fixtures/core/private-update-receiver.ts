// recv.#x++ and recv.#x += v read the receiver once: through a temp, but for `this` (tsc's
// createCopiableReceiverExpr: a name gets one too)
declare function d(...a: any[]): any;
class A { #x = 1; static #s = 1; m(o: any) { o.f().#x++; A.#s++; let v = o.g().#x++; o.h().#x += 2; this.#x++; o.#x += 1; } }
@d class B { static #s = 1; m() { B.#s++; B.#s += 1; return B.#s; } }
