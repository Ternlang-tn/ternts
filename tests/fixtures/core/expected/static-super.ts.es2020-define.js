var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b, _c, _d;
const k = "v";
class C extends (_b = B) {
}
_a = C;
Object.defineProperty(C, "a", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, k, _a)
});
Object.defineProperty(C, "b", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Reflect.get(_b, "w", _a).call(_a, 1, ...[2])
});
(() => {
    Reflect.set(_b, "v", Reflect.get(_b, "v", _a) + 1, _a);
    Reflect.set(_b, k, 3, _a);
    const f = () => Reflect.get(_b, "w", _a).call(_a);
})();
const D = (_c = class extends (_d = B) {
    },
    __setFunctionName(_c, "D"),
    Object.defineProperty(_c, "y", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: Reflect.get(_d, "v", _c)
    }),
    _c);
