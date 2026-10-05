// the #private helpers in the order tsc asks for them: members in order (the constructor's
// body, then the instance initializers, at the constructor), statics last
class A { #p = 1; m() { return this.#p; } constructor(x: number) { this.#p = x; } }
class B { #p = 1; constructor() { } m() { this.#p = 2; } q = this.#p; }
class C { #p = 1; static s = (a: C) => { a.#p = 1; }; m() { return #p in this; } }
