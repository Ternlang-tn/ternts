var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a;
var _b, _c, _d, _e;
class A {
}
A.a = 1;
class C extends (_c = A) {
}
_b = C;
C.z8 = [({ set value(_a) { Reflect.set(_c, "a", _a, _b); } }).value] = [0];
C.z9 = [({ set value(_a) { Reflect.set(_c, "a", _a, _b); } }).value = 1] = [0];
C.z10 = [...({ set value(_a) { Reflect.set(_c, "a", _a, _b); } }).value] = [0];
C.z11 = { x: ({ set value(_a) { Reflect.set(_c, "a", _a, _b); } }).value } = { x: 0 };
C.z12 = { x: ({ set value(_a) { Reflect.set(_c, "a", _a, _b); } }).value = 1 } = { x: 0 };
C.z13 = (_a = { x: 0 }, ({ set value(_a) { Reflect.set(_c, "a", _a, _b); } }).value = __rest(_a, []), _a);
class A2 {
}
A2.a = 1;
class C2 extends (_e = A2) {
}
_d = C2;
C2.v1 = [Reflect.get(_e, "a", _d)];
C2.v2 = f([Reflect.get(_e, "a", _d)], 1);
C2.v3 = { x: Reflect.get(_e, "a", _d) };
C2.v4 = (Reflect.get(_e, "a", _d), 2);
