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
var __classPrivateFieldIn = (this && this.__classPrivateFieldIn) || function(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
};
var _A_p, _B_p, _C_p;
class A {
    m() { return __classPrivateFieldGet(this, _A_p, "f"); }
    constructor(x) {
        _A_p.set(this, 1);
        __classPrivateFieldSet(this, _A_p, x, "f");
    }
}
_A_p = new WeakMap();
class B {
    constructor() {
        _B_p.set(this, 1);
        this.q = __classPrivateFieldGet(this, _B_p, "f");
    }
    m() { __classPrivateFieldSet(this, _B_p, 2, "f"); }
}
_B_p = new WeakMap();
class C {
    constructor() {
        _C_p.set(this, 1);
    }
    m() { return __classPrivateFieldIn(_C_p, this); }
}
_C_p = new WeakMap();
C.s = (a) => { __classPrivateFieldSet(a, _C_p, 1, "f"); };
