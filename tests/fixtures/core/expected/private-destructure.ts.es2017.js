var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _A_x, _A_s;
class A {
    constructor() {
        _A_x.set(this, 1);
    }
    m(o, y) { var _b, _c; (_b = this, { a: ({ set value(_d) { __classPrivateFieldSet(_b, _A_x, _d, "f"); } }).value, b: y } = { a: 1, b: 2 }); _c = this, [({ set value(_d) { __classPrivateFieldSet(_c, _A_x, _d, "f"); } }).value = 3, ({ set value(_d) { __classPrivateFieldSet(o, _A_x, _d, "f"); } }).value] = []; [({ set value(_d) { __classPrivateFieldSet(_a, _a, _d, "f", _A_s); } }).value] = [4]; }
}
_a = A, _A_x = new WeakMap();
_A_s = { value: 2 };
