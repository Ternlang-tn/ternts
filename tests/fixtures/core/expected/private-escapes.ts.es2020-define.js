var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _A_x, _A_yz;
class A {
    constructor() {
        _A_x.set(this, void 0);
        _A_yz.set(this, 1);
        __classPrivateFieldSet(this, _A_x, 0, "f");
    }
    m() { __classPrivateFieldSet(this, _A_x, 42, "f"); return __classPrivateFieldGet(this, _A_yz, "f") + __classPrivateFieldGet(this, _A_yz, "f"); }
}
_A_x = new WeakMap(), _A_yz = new WeakMap();
