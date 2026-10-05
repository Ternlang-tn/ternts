var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _R_e;
g.R = (_a = class R {
        m() { return [__classPrivateFieldGet(_a, _a, "f", _R_e), _a.x, _a]; }
    },
    _R_e = { value: 1 },
    Object.defineProperty(_a, "x", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 2
    }),
    _a);
tool.onDrop?.(app);
