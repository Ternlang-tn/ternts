var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a;
const out = [];
for (let i = 0; i < 3; ++i) {
    let _C_f;
    out.push((_a = class C {
            constructor() {
                _C_f.set(this, i);
            }
            get() { return __classPrivateFieldGet(this, _C_f, "f"); }
        },
        _C_f = new WeakMap(),
        _a));
}
console.log(out.map(K => new K().get()).join());
while (out.length) {
    const K = out.pop();
    function g() { var _z, _b; return _b = class {
            constructor() {
                _z.set(this, 1);
            }
        },
        _z = new WeakMap(),
        _b; }
    g();
}
