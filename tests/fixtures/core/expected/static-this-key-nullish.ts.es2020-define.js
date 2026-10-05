var _a;
class W {
}
_a = W;
Object.defineProperty(W, "X", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: "x"
});
Object.defineProperty(W, "P", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { [this.X]: 1 }
});
Object.defineProperty(W, "Q", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: _a.X
});
const x2 = a ?? 1;
const x4 = a ?? 1;
const x7 = a?.b;
