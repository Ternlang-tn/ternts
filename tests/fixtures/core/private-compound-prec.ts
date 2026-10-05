// a lowered compound assignment keeps its right side's grouping: this.#x *= a + b is
// set(get * (a + b)) (was get * a + b), ?? and || && parenthesized, static super too
class B { static s: any = 1; }
class C extends B {
  #x: any = 1;
  m(a: number, b: number, c: any) {
    this.#x *= a + b;
    this.#x -= a - b;
    this.#x ??= c ? a : b;
    this.#x **= a ** b;
    this.#x ||= (c && a);
    return this.#x;
  }
  static y = (super.s *= 2 + 3);
}
