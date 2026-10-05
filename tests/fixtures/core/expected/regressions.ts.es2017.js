"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithSuper = exports.cmp = exports.arrow = exports.template = exports.div = exports.re = exports.sep = void 0;
exports.castThenChain = castThenChain;
exports.generic = generic;
exports.default = default_1;
function castThenChain(x) {
    var _a;
    return (_a = x === null || x === void 0 ? void 0 : x.y) === null || _a === void 0 ? void 0 : _a.z;
}
;
exports.sep = `a${"\u0000"}b`;
exports.re = /['"]/g, exports.div = 4 / 2 / 1;
exports.template = `x${`nested${1}`}y`;
function generic(t) { return t.a < 2 && t.a > 0; }
const arrow = async (x) => x;
exports.arrow = arrow;
let a = 1, b = 2;
exports.cmp = a < b ? (b > a ? 1 : 2) : 3;
class WithSuper extends Array {
    constructor(p) {
        super();
        this.p = p;
        this.x = 1;
    }
}
exports.WithSuper = WithSuper;
label: for (const k in { a: 1 }) {
    if (k)
        continue label;
}
function default_1() { return 0; }
