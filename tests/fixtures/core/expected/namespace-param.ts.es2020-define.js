"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.P = exports.M = exports.N = void 0;
exports.M2 = M2;
var N;
(function (N) {
    function f() { return `a${g(1)}b`; }
    N.f = f;
})(N || (exports.N = N = {}));
var M;
(function (M) {
    M.x = 1;
})(M || (exports.M = M = {}));
function h(c) { return c ? (N.f() || null) : null; }
function M2() { }
const k = (N) => N;
var P;
(function (P) {
    function f() { return 1; }
    P.f = f;
    function h(c) { return c ? (P.f() || null) : null; }
    P.h = h;
    P.g = (a) => a ? (P) : 0;
})(P || (exports.P = P = {}));
