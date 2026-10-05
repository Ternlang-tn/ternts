export class Y {
    static { this.s = 1; }
}
export default class X {
    static { this.s = 1; }
    #p = 1;
    m() { return this.#p; }
}
