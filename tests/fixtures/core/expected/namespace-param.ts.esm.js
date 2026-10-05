export var N;
(function (N) {
    function f() { return `a${g(1)}b`; }
    N.f = f;
})(N || (N = {}));
export var M;
(function (M) {
    M.x = 1;
})(M || (M = {}));
function h(c) { return c ? (N.f() || null) : null; }
export function M2() { }
const k = (N) => N;
export var P;
(function (P) {
    function f() { return 1; }
    P.f = f;
    function h(c) { return c ? (P.f() || null) : null; }
    P.h = h;
    P.g = (a) => a ? (P) : 0;
})(P || (P = {}));
