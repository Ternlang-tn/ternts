"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a2 = exports.a = void 0;
exports.a = 1;
exports.a2 = exports.a;
let o;
function f() { exports.a2 = (exports.a++, exports.a); return (exports.a2 = ++exports.a) + 1; }
function g() { return (exports.a2 = ++exports.a) + o?.x; }
function h() { return (exports.a2 = exports.a = 3) + o?.x; }
