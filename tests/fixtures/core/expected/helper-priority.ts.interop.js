const X = class {
    static { this.s = 1; }
};
async function f() { }
class C {
    #p = 1;
    #k = class {
        static { this.t = 2; }
    };
    m() { return this.#p; }
}
