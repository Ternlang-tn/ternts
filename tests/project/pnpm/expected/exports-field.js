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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsesExports = void 0;
const decorators_1 = require("./decorators");
const exp_1 = require("@scope/exp");
let UsesExports = class UsesExports {
    constructor(s, id, en) { }
};
exports.UsesExports = UsesExports;
exports.UsesExports = UsesExports = __decorate([
    (0, decorators_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof exp_1.Svc !== "undefined" && exp_1.Svc) === "function" ? _a : Object, typeof (_b = typeof exp_1.Id !== "undefined" && exp_1.Id) === "function" ? _b : Object, typeof (_c = typeof exp_1.E !== "undefined" && exp_1.E) === "function" ? _c : Object])
], UsesExports);
