"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Referenced_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renamed = exports.Referenced = void 0;
function dec(...args) { }
let Referenced = class Referenced {
    static { Referenced_1 = this; }
    static { this.self = Referenced_1; }
    create() { return new Referenced_1(); }
};
exports.Referenced = Referenced;
exports.Referenced = Referenced = Referenced_1 = __decorate([
    dec
], Referenced);
let Plain = class Plain {
    m() { }
};
exports.Renamed = Plain;
exports.Renamed = Plain = __decorate([
    dec
], Plain);
