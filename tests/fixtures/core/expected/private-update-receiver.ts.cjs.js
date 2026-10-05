var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var B_1;
class A {
    #x = 1;
    static #s = 1;
    m(o) { o.f().#x++; A.#s++; let v = o.g().#x++; o.h().#x += 2; this.#x++; o.#x += 1; }
}
let B = class B {
    static { B_1 = this; }
    static #s = 1;
    m() { B_1.#s++; B_1.#s += 1; return B_1.#s; }
};
B = B_1 = __decorate([
    d
], B);
