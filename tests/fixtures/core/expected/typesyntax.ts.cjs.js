"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.out = void 0;
exports.opt = opt;
const bar_1 = require("./bar");
const ns = require("./ns");
const def_1 = require("./def");
let v = bar_1.baz;
let w = bar_1.baz;
let s = { a: 1 };
let n = v.thing;
const fn = (x) => true;
function assertIs(x) { }
exports.out = [v, w, s, n, fn, ns.value, def_1.default, assertIs];
function opt(a, ...rest) { }
class A {
}
let tpl = `a${1}`;
let tup = [1];
