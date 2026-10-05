const X = class {
    static s = 1;
};
async function f() { }
class C {
    #p = 1;
    #k = class {
        static t = 2;
    };
    m() { return this.#p; }
}
