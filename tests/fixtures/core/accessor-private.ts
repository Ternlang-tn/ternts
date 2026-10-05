// `accessor #a` below ES2022: #a's getter and setter are lowered like any #private accessor
class C1 {
  accessor #a: any;
  accessor #b = 1;
  static accessor #c: any;
  static accessor #d = 2;
  constructor() {
    this.#a = 3;
    this.#b = 4;
  }
  static {
    this.#c = 5;
    this.#d = 6;
  }
  m() { return this.#a + C1.#c; }
}
