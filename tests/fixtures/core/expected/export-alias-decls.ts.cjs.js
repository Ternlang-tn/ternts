"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a1 = exports.M1 = exports.E1 = exports.a = exports.M = exports.E = void 0;
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
})(E || (exports.E1 = exports.E = E = {}));
var M;
(function (M) {
    M.x = 1;
})(M || (exports.M1 = exports.M = M = {}));
exports.a = M.x;
exports.a1 = exports.a;
class C {
    #foo = class {
        static { this.s = 1; }
    };
    get() { return this.#foo; }
}
