@dec
class C {
    @dec
    static #m() { }
    @dec
    static get #g() { return 1; }
    @dec
    static #f = 1;
    static m() { return C.#m(); }
}
@dec
class D {
    static #field1 = 0;
    static {
        this.#field1;
        this.#field1 = 1;
    }
}
