// #private names written with \u escapes are the same names
class A {
  #x: number;
  #\u{79}z = 1;
  constructor() { this.#x = 0; }
  m() { this.#x = 42; return this.#yz + this.#\u{79}z; }
}
