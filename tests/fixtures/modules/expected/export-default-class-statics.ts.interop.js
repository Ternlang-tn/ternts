"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Y = void 0;
class Y {
    static { this.s = 1; }
}
exports.Y = Y;
class X {
    static { this.s = 1; }
    #p = 1;
    m() { return this.#p; }
}
exports.default = X;
