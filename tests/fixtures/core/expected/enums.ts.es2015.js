"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flags = exports.Dir = exports.Color = void 0;
exports.use = use;
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 5] = "Green";
    Color[Color["Blue"] = 6] = "Blue";
})(Color || (exports.Color = Color = {}));
var Dir;
(function (Dir) {
    Dir["Up"] = "UP";
    Dir["Down"] = "DOWN";
})(Dir || (exports.Dir = Dir = {}));
var Flags;
(function (Flags) {
    Flags[Flags["None"] = 0] = "None";
    Flags[Flags["A"] = 1] = "A";
    Flags[Flags["B"] = 2] = "B";
    Flags[Flags["AB"] = 3] = "AB";
})(Flags || (exports.Flags = Flags = {}));
var Mixed;
(function (Mixed) {
    Mixed[Mixed["X"] = 1] = "X";
    Mixed[Mixed["Y"] = 2] = "Y";
    Mixed[Mixed["Z"] = "z".length] = "Z";
})(Mixed || (Mixed = {}));
function use(c, d) {
    return [c === Color.Red, d === Dir.Up, Flags.AB, Mixed.Y, Color[Color.Blue]];
}
