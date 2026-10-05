// new / tagged templates on #private members below ES2022
class A {
  #f = function (this: any) { };
  static #s = function () { };
  m(o: A) { new this.#f(); new o.#f(1); const t = this.#f`a${1}b`; o.#f`x`; new A.#s(); }
}
