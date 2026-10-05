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
Object.defineProperty(exports, "__esModule", { value: true });
exports.B = exports.A = void 0;
function Prop() { }
class A {
    get value() { return 1; }
    set value(v) { }
    get onlyGet() { return ""; }
    set onlySet(v) { }
}
exports.A = A;
__decorate([
    Prop(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], A.prototype, "value", null);
__decorate([
    Prop(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], A.prototype, "onlyGet", null);
__decorate([
    Prop(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], A.prototype, "onlySet", null);
class B {
    get x() { return 1; }
    set x(v) { }
    set y(v) { }
    get y() { return ""; }
    static get z() { return 1; }
    static set z(v) { }
}
exports.B = B;
__decorate([
    Prop(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], B.prototype, "x", null);
__decorate([
    Prop(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [Object])
], B.prototype, "y", null);
__decorate([
    Prop(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], B, "z", null);
