"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALIASED = exports.LEVELS = exports.MODES = exports.Repo = exports.Num = exports.Color = void 0;
var Color;
(function (Color) {
    Color["Red"] = "red";
    Color["Blue"] = "blue";
})(Color || (exports.Color = Color = {}));
var Num;
(function (Num) {
    Num[Num["One"] = 1] = "One";
})(Num || (exports.Num = Num = {}));
class Repo {
}
exports.Repo = Repo;
exports.MODES = { CHAT: "chat", BUILDER: "builder" };
exports.LEVELS = ["low", "high"];
exports.ALIASED = exports.LEVELS;
