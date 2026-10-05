// a class-decorated class at ES2022: its static #private methods, accessors and fields (and a
// static accessor's storage) are lowered through _classThis, as tsc (the decorator may return
// another class: D.#m() would throw); instance #private members stay
declare let dec: any;
@dec
class D {
    static #method1() { return 1; }
    static #x = 1;
    static get #g() { return 2; }
    static accessor #acc = 3;
    static accessor plain = 4;
    static m() { return D.#method1() + D.#x + this.#g + D.#acc + this.plain; }
    #inst = 5;
    i() { return this.#inst; }
}
