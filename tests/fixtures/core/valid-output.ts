// output that must stay JavaScript: an enum as an if body, >>= on a private field, an
// instantiation expression before instanceof, a member of a destructured number
if (Math.random()) enum E { A } else enum F { B }
class P { #f = 1; m() { this.#f >>= 1; this.#f >>>= 2; } }
declare class Box<T> { v: T }
const ok = Box<number> instanceof Object;
export let { toFixed } = 1;
