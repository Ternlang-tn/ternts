var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var _a, _A_x, _A_s, _b, _B_s;
var B_1;
class A {
    constructor() {
        _A_x.set(this, 1);
    }
    m(o) { var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m; __classPrivateFieldSet(_c = o.f(), _A_x, (_d = __classPrivateFieldGet(_c, _A_x, "f"), _d++, _d), "f"); __classPrivateFieldSet(_e = _a, _a, (_f = __classPrivateFieldGet(_e, _a, "f", _A_s), _f++, _f), "f", _A_s); let v = (__classPrivateFieldSet(_g = o.g(), _A_x, (_j = __classPrivateFieldGet(_g, _A_x, "f"), _h = _j++, _j), "f"), _h); __classPrivateFieldSet(_k = o.h(), _A_x, __classPrivateFieldGet(_k, _A_x, "f") + 2, "f"); __classPrivateFieldSet(this, _A_x, (_l = __classPrivateFieldGet(this, _A_x, "f"), _l++, _l), "f"); __classPrivateFieldSet(_m = o, _A_x, __classPrivateFieldGet(_m, _A_x, "f") + 1, "f"); }
}
_a = A, _A_x = new WeakMap();
_A_s = { value: 1 };
let B = B_1 = _b = class B {
    m() { var _c, _d, _e; __classPrivateFieldSet(_c = B_1, _b, (_d = __classPrivateFieldGet(_c, _b, "f", _B_s), _d++, _d), "f", _B_s); __classPrivateFieldSet(_e = B_1, _b, __classPrivateFieldGet(_e, _b, "f", _B_s) + 1, "f", _B_s); return __classPrivateFieldGet(B_1, _b, "f", _B_s); }
};
_B_s = { value: 1 };
B = B_1 = __decorate([
    d
], B);
