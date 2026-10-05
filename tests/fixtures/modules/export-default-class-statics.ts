// below ES2022 an `export default class C` with statements after it (statics, #private
// inits, static blocks) is `class C ...; export default C;` after them; `export class` stays
export class Y { static s = 1; }
export default class X { static s = 1; #p = 1; m() { return this.#p; } }
