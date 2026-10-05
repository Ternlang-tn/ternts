"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _C_foo;
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
    constructor() {
        var _a;
        _C_foo.set(this, (_a = class {
            },
            __setFunctionName(_a, "#foo"),
            _a.s = 1,
            _a));
    }
    get() { return __classPrivateFieldGet(this, _C_foo, "f"); }
}
_C_foo = new WeakMap();
