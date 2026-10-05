// a member decorator that reads a #private name (ES2022+): the __decorate calls go in a
// static block, where #x is in scope (tsc)
declare var decorator: any;
class C1 { #x = 1; @decorator((x: C1) => x.#x) y() {} }
class C2 { #x = 2; y(@decorator((x: C2) => x.#x) p: any) {} }
