"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SYM = void 0;
class C {
    constructor() {
        this[_a] = 1;
    }
    static { Symbol.iterator; }
    [(a(), _a = c(), d(), e())]() { }
}
class D {
    static { h(); }
}
class E {
    ["method"]() { }
}
__decorate([
    dec,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], E.prototype, "method", null);
exports.SYM = Symbol();
class Z {
    constructor() {
        this.#p = 1;
        this[_b] = 2;
    }
    static { _b = k2(); }
    #p;
}
