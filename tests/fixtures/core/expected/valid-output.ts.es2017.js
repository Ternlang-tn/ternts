"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _P_f;
Object.defineProperty(exports, "__esModule", { value: true });
exports.toFixed = void 0;
if (Math.random()) {
    var E;
    (function (E) {
        E[E["A"] = 0] = "A";
    })(E || (E = {}));
}
else {
    var F;
    (function (F) {
        F[F["B"] = 0] = "B";
    })(F || (F = {}));
}
class P {
    constructor() {
        _P_f.set(this, 1);
    }
    m() { __classPrivateFieldSet(this, _P_f, __classPrivateFieldGet(this, _P_f, "f") >> 1, "f"); __classPrivateFieldSet(this, _P_f, __classPrivateFieldGet(this, _P_f, "f") >>> 2, "f"); }
}
_P_f = new WeakMap();
const ok = (Box) instanceof Object;
exports.toFixed = 1..toFixed;
