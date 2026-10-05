"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
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
var _a, _X_a_accessor_storage, _b, _default_1_b_accessor_storage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.X = void 0;
exports.X = (_a = class {
        static get a() { return __classPrivateFieldGet(_a, _a, "f", _X_a_accessor_storage); }
        static set a(value) { __classPrivateFieldSet(_a, _a, value, "f", _X_a_accessor_storage); }
    },
    __setFunctionName(_a, "X"),
    _X_a_accessor_storage = { value: 1 },
    _a);
class default_1 {
    static get b() { return __classPrivateFieldGet(_b, _b, "f", _default_1_b_accessor_storage); }
    static set b(value) { __classPrivateFieldSet(_b, _b, value, "f", _default_1_b_accessor_storage); }
}
_b = default_1;
_default_1_b_accessor_storage = { value: 2 };
exports.default = default_1;
