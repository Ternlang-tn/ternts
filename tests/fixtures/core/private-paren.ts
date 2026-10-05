// parenthesized #private targets below ES2022: (this.#p as T) = v, (this.#p)++, ++(this.#p)
class F {
  #p = 0;
  m(v: number) { (this.#p as number) = v; (((this.#p))) = v; (this.#p) += 1; (this.#p)++; ++(this.#p); for (;;(this.#p)++) { break; } }
}
