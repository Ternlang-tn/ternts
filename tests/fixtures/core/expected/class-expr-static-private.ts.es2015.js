var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _b;
var _c, _R_e;
g.R = (_c = class R {
        m() { return [__classPrivateFieldGet(_c, _c, "f", _R_e), _c.x, _c]; }
    },
    _R_e = { value: 1 },
    _c.x = 2,
    _c);
(_b = (_a = tool).onDrop) === null || _b === void 0 ? void 0 : _b.call(_a, app);
