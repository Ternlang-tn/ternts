"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Outer = exports.Solo = exports.Color = exports.S2 = exports.S1 = void 0;
var Space;
(function (Space) {
    Space.a = 1;
})(Space || (exports.S2 = exports.S1 = Space = {}));
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
})(Color || (exports.Color = Color = {}));
(function (Color) {
    Color[Color["Blue"] = 5] = "Blue";
})(Color || (exports.Color = Color = {}));
var Solo;
(function (Solo) {
    Solo[Solo["X"] = 0] = "X";
})(Solo || (exports.Solo = Solo = {}));
var Inner;
(function (Inner) {
    let Deep;
    (function (Deep) {
        Deep.z = 1;
    })(Deep || (Deep = {}));
    Inner.w = 2;
})(Inner || (Inner = {}));
var NotExported;
(function (NotExported) {
    NotExported.q = 1;
})(NotExported || (NotExported = {}));
var Outer;
(function (Outer) {
    let Mid;
    (function (Mid) {
        Mid.m = 1;
    })(Mid = Outer.Mid || (Outer.Mid = {}));
})(Outer || (exports.Outer = Outer = {}));
