class A {
    #x = 1;
    static #s = 2;
    m(o, y) { ({ a: this.#x, b: y } = { a: 1, b: 2 }); [this.#x = 3, o.#x] = []; [A.#s] = [4]; }
}
