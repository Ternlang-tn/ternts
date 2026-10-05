class A {
    #p = 1;
    m() { return this.#p; }
    constructor(x) { this.#p = x; }
}
class B {
    #p = 1;
    constructor() { }
    m() { this.#p = 2; }
    q = this.#p;
}
class C {
    #p = 1;
    static s = (a) => { a.#p = 1; };
    m() { return #p in this; }
}
