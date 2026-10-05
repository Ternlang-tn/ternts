var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _C_p, _C_k;
const X = (_a = class {
    },
    __setFunctionName(_a, "X"),
    _a.s = 1,
    _a);
async function f() { }
class C {
    constructor() {
        var _b;
        _C_p.set(this, 1);
        _C_k.set(this, (_b = class {
            },
            __setFunctionName(_b, "#k"),
            _b.t = 2,
            _b));
    }
    m() { return __classPrivateFieldGet(this, _C_p, "f"); }
}
_C_p = new WeakMap(), _C_k = new WeakMap();
