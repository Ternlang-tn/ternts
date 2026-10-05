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
var _a, _b, _C_x, _c;
class B {
}
B.s = 1;
class C extends (_b = B) {
    constructor() {
        super(...arguments);
        _C_x.set(this, 1);
    }
    m(a, b, c) {
        var _c;
        __classPrivateFieldSet(this, _C_x, __classPrivateFieldGet(this, _C_x, "f") * (a + b), "f");
        __classPrivateFieldSet(this, _C_x, __classPrivateFieldGet(this, _C_x, "f") - (a - b), "f");
        __classPrivateFieldSet(this, _C_x, (_c = __classPrivateFieldGet(this, _C_x, "f")) !== null && _c !== void 0 ? _c : (c ? a : b), "f");
        __classPrivateFieldSet(this, _C_x, Math.pow(__classPrivateFieldGet(this, _C_x, "f"), Math.pow(a, b)), "f");
        __classPrivateFieldSet(this, _C_x, __classPrivateFieldGet(this, _C_x, "f") || (c && a), "f");
        return __classPrivateFieldGet(this, _C_x, "f");
    }
}
_a = C, _C_x = new WeakMap();
C.y = (Reflect.set(_b, "s", _c = Reflect.get(_b, "s", _a) * (2 + 3), _a), _c);
