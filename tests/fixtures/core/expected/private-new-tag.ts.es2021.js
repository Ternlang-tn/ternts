var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _A_f, _A_s;
class A {
    constructor() {
        _A_f.set(this, function () { });
    }
    m(o) { new (__classPrivateFieldGet(this, _A_f, "f"))(); new (__classPrivateFieldGet(o, _A_f, "f"))(1); const t = __classPrivateFieldGet(this, _A_f, "f").bind(this) `a${1}b`; __classPrivateFieldGet(o, _A_f, "f").bind(o) `x`; new (__classPrivateFieldGet(_a, _a, "f", _A_s))(); }
}
_a = A, _A_f = new WeakMap();
_A_s = { value: function () { } };
