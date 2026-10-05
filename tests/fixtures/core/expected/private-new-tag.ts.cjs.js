class A {
    #f = function () { };
    static #s = function () { };
    m(o) { new this.#f(); new o.#f(1); const t = this.#f `a${1}b`; o.#f `x`; new A.#s(); }
}
