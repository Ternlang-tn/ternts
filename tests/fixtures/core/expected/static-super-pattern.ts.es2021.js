var _a, _b, _c, _d;
class A {
}
A.a = 1;
class C extends (_b = A) {
}
_a = C;
C.z8 = [({ set value(_e) { Reflect.set(_b, "a", _e, _a); } }).value] = [0];
C.z9 = [({ set value(_e) { Reflect.set(_b, "a", _e, _a); } }).value = 1] = [0];
C.z10 = [...({ set value(_e) { Reflect.set(_b, "a", _e, _a); } }).value] = [0];
C.z11 = { x: ({ set value(_e) { Reflect.set(_b, "a", _e, _a); } }).value } = { x: 0 };
C.z12 = { x: ({ set value(_e) { Reflect.set(_b, "a", _e, _a); } }).value = 1 } = { x: 0 };
C.z13 = { ...({ set value(_e) { Reflect.set(_b, "a", _e, _a); } }).value } = { x: 0 };
class A2 {
}
A2.a = 1;
class C2 extends (_d = A2) {
}
_c = C2;
C2.v1 = [Reflect.get(_d, "a", _c)];
C2.v2 = f([Reflect.get(_d, "a", _c)], 1);
C2.v3 = { x: Reflect.get(_d, "a", _c) };
C2.v4 = (Reflect.get(_d, "a", _c), 2);
