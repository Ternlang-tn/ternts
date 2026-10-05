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
var _a;
var _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keys = exports.A = void 0;
function Prop() { }
class A {
}
exports.A = A;
__decorate([
    Prop(),
    __metadata("design:type", Number)
], A.prototype, "plain", void 0);
__decorate([
    Prop(),
    __metadata("design:type", String)
], A.prototype, 1, void 0);
__decorate([
    Prop(),
    __metadata("design:type", Boolean)
], A.prototype, "normal", void 0);
function P() { }
const k = "z";
class Keys {
    constructor() {
        this["a"] = 1;
        this[2] = 2;
        this["d"] = 4;
        this[_b] = 5;
        this[`t`] = 6;
        this[_a] = 7;
    }
}
exports.Keys = Keys;
_b = k, _a = -1;
Keys["s"] = 3;
__decorate([
    P(),
    __metadata("design:type", Object)
], Keys.prototype, "d", void 0);
__decorate([
    P(),
    __metadata("design:type", Object)
], Keys.prototype, _b, void 0);
