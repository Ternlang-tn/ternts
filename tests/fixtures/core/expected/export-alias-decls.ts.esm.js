export var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
})(E || (E = {}));
export var M;
(function (M) {
    M.x = 1;
})(M || (M = {}));
export var a = M.x;
export { E as E1, M as M1, a as a1 };
class C {
    #foo = class {
        static { this.s = 1; }
    };
    get() { return this.#foo; }
}
