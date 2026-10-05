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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Keys = exports.A = void 0;
function Prop() { }
class A {
    ["plain"];
    [1];
    normal;
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
    ["a"] = 1;
    [2] = 2;
    static ["s"] = 3;
    ["d"] = 4;
    [_a = k] = 5;
    [`t`] = 6;
    [-1] = 7;
}
exports.Keys = Keys;
__decorate([
    P(),
    __metadata("design:type", Object)
], Keys.prototype, "d", void 0);
__decorate([
    P(),
    __metadata("design:type", Object)
], Keys.prototype, _a, void 0);
