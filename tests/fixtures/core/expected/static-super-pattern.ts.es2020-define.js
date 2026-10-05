var _a, _b, _c, _d;
class A {
}
Object.defineProperty(A, "a", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 1
});
class C extends (_b = A) {
}
_a = C;
Object.defineProperty(C, "z8", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: [({ set value(_e) { Reflect.set(_b, "a", _e, _a); } }).value] = [0]
});
Object.defineProperty(C, "z9", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: [({ set value(_e) { Reflect.set(_b, "a", _e, _a); } }).value = 1] = [0]
});
Object.defineProperty(C, "z10", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: [...({ set value(_e) { Reflect.set(_b, "a", _e, _a); } }).value] = [0]
});
Object.defineProperty(C, "z11", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { x: ({ set value(_e) { Reflect.set(_b, "a", _e, _a); } }).value } = { x: 0 }
});
Object.defineProperty(C, "z12", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { x: ({ set value(_e) { Reflect.set(_b, "a", _e, _a); } }).value = 1 } = { x: 0 }
});
Object.defineProperty(C, "z13", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { ...({ set value(_e) { Reflect.set(_b, "a", _e, _a); } }).value } = { x: 0 }
});
class A2 {
}
Object.defineProperty(A2, "a", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 1
});
class C2 extends (_d = A2) {
}
_c = C2;
Object.defineProperty(C2, "v1", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: [Reflect.get(_d, "a", _c)]
});
Object.defineProperty(C2, "v2", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: f([Reflect.get(_d, "a", _c)], 1)
});
Object.defineProperty(C2, "v3", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { x: Reflect.get(_d, "a", _c) }
});
Object.defineProperty(C2, "v4", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (Reflect.get(_d, "a", _c), 2)
});
