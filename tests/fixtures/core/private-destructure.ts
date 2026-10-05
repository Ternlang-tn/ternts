// #private targets in destructuring assignments below ES2022 (setter objects)
class A {
  #x = 1; static #s = 2;
  m(o: A, y: number) { ({ a: this.#x, b: y } = { a: 1, b: 2 }); [this.#x = 3, o.#x] = []; [A.#s] = [4]; }
}
