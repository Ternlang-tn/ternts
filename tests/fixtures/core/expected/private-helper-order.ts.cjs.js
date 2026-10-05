class A {
    #p = 1;
    m() { return this.#p; }
    constructor(x) { this.#p = x; }
}
class B {
    #p;
    constructor() {
        this.#p = 1;
        this.q = this.#p;
    }
    m() { this.#p = 2; }
}
class C {
    #p = 1;
    static { this.s = (a) => { a.#p = 1; }; }
    m() { return #p in this; }
}
