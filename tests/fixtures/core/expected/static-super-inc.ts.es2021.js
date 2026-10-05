var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
class A {
}
A.x = 1;
class B extends (_b = A) {
}
_a = B;
B.a = (Reflect.set(_b, "x", (_d = Reflect.get(_b, "x", _a), _c = _d++, _d), _a), _c);
B.b = (Reflect.set(_b, "x", (_f = Reflect.get(_b, "x", _a), _e = --_f), _a), _e);
B.c = (Reflect.set(_b, "x", (_h = Reflect.get(_b, "x", _a), _g = _h++, _h), _a), _g);
(() => {
    var _c, _d;
    Reflect.set(_b, "x", (_c = Reflect.get(_b, "x", _a), _c++, _c), _a);
    Reflect.set(_b, "x", (_d = Reflect.get(_b, "x", _a), ++_d), _a);
})();
class A2 {
}
A2.x = 1;
class B2 extends (_k = A2) {
}
_j = B2;
(() => {
    var _c, _d;
    const q = (Reflect.set(_k, "x", (_d = Reflect.get(_k, "x", _j), _c = _d++, _d), _j), _c);
})();
class C3 extends (_m = B3) {
}
_l = C3;
C3.y5 = _l?.[("x")]();
C3.z5 = (Reflect.set(_m, "a", _o = 0, _l), _o);
C3.z6 = (Reflect.set(_m, "a", _p = Reflect.get(_m, "a", _l) + 1, _l), _p);
C3.z14 = (Reflect.set(_m, "a", (_r = Reflect.get(_m, "a", _l), _q = ++_r), _l), _q);
C3.z16 = (Reflect.set(_m, _s = ("a"), (_u = Reflect.get(_m, _s, _l), _t = ++_u), _l), _t);
C3.z17 = (Reflect.set(_m, _v = k(), (_x = Reflect.get(_m, _v, _l), _w = _x++, _x), _l), _w);
C3.z18 = Reflect.get(_m, "a", _l).bind(_l) ``;
(() => {
    var _c, _d;
    Reflect.set(_m, "a", 1, _l);
    Reflect.set(_m, _c = k(), (_d = Reflect.get(_m, _c, _l), _d++, _d), _l);
})();
