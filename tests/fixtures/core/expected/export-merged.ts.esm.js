var Merged;
(function (Merged) {
    Merged[Merged["A"] = 1] = "A";
})(Merged || (Merged = {}));
(function (Merged) {
    Merged[Merged["B"] = 2] = "B";
})(Merged || (Merged = {}));
function f() { }
(function (f) {
    f.meta = 1;
})(f || (f = {}));
var Space;
(function (Space) {
    Space.a = 1;
})(Space || (Space = {}));
(function (Space) {
    Space.b = 2;
})(Space || (Space = {}));
export { Merged, f, Space };
