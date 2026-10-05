"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Space = exports.Merged = void 0;
exports.f = f;
var Merged;
(function (Merged) {
    Merged[Merged["A"] = 1] = "A";
})(Merged || (exports.Merged = Merged = {}));
(function (Merged) {
    Merged[Merged["B"] = 2] = "B";
})(Merged || (exports.Merged = Merged = {}));
function f() { }
(function (f) {
    f.meta = 1;
})(f || (exports.f = f = {}));
var Space;
(function (Space) {
    Space.a = 1;
})(Space || (exports.Space = Space = {}));
(function (Space) {
    Space.b = 2;
})(Space || (exports.Space = Space = {}));
