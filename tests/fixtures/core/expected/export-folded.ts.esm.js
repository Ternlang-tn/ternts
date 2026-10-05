var Space;
(function (Space) {
    Space.a = 1;
})(Space || (Space = {}));
export { Space as S1, Space as S2 };
export var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
})(Color || (Color = {}));
(function (Color) {
    Color[Color["Blue"] = 5] = "Blue";
})(Color || (Color = {}));
var Solo;
(function (Solo) {
    Solo[Solo["X"] = 0] = "X";
})(Solo || (Solo = {}));
var Inner;
(function (Inner) {
    let Deep;
    (function (Deep) {
        Deep.z = 1;
    })(Deep || (Deep = {}));
    Inner.w = 2;
})(Inner || (Inner = {}));
export { Solo };
var NotExported;
(function (NotExported) {
    NotExported.q = 1;
})(NotExported || (NotExported = {}));
export var Outer;
(function (Outer) {
    let Mid;
    (function (Mid) {
        Mid.m = 1;
    })(Mid = Outer.Mid || (Outer.Mid = {}));
})(Outer || (Outer = {}));
