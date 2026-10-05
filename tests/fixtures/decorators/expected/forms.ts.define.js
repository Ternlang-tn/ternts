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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
function dec(...args) { }
let A = class A {
    static s = 1;
    i = 2;
    #acc_accessor_storage = 3;
    get acc() { return this.#acc_accessor_storage; }
    set acc(value) { this.#acc_accessor_storage = value; }
    [_a = "computed" + 1]() { }
    m(a, b) { }
};
exports.A = A;
__decorate([
    dec(),
    __metadata("design:type", Object)
], A.prototype, "i", void 0);
__decorate([
    dec,
    __metadata("design:type", Object)
], A.prototype, "acc", null);
__decorate([
    dec,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], A.prototype, _a, null);
__decorate([
    __param(0, dec),
    __param(1, dec()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], A.prototype, "m", null);
__decorate([
    dec,
    __metadata("design:type", Object)
], A, "s", void 0);
exports.A = A = __decorate([
    dec,
    dec()
], A);
let WithCtorParams = class WithCtorParams {
    a;
    b;
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
};
WithCtorParams = __decorate([
    dec,
    __param(0, dec),
    __metadata("design:paramtypes", [String, Number])
], WithCtorParams);
