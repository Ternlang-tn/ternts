// a decorated class with decorated static #private members and a static block that reads one:
// below ES2022 its statics stay in the class for the class-fields pass (esdecorators.tn xmode)
declare var dec: any;
@dec
class C {
  @dec static #m() {}
  @dec static get #g() { return 1; }
  @dec static #f = 1;
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
