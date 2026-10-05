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
var _D_p;
class D {
    constructor() {
        _D_p.set(this, 3);
    }
    run() { var _a, _b, _c, _d; const r = []; r.push(__classPrivateFieldSet(this, _D_p, (_a = __classPrivateFieldGet(this, _D_p, "f"), ++_a), "f")); r.push((__classPrivateFieldSet(this, _D_p, (_c = __classPrivateFieldGet(this, _D_p, "f"), _b = _c++, _c), "f"), _b)); r.push(__classPrivateFieldSet(this, _D_p, (_d = __classPrivateFieldGet(this, _D_p, "f"), --_d), "f")); return r; }
}
_D_p = new WeakMap();
const m = e?.message;
