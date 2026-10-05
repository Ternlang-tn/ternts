"use strict";
var _a;
var _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.foo = foo;
const q = {
    a
};
(_b = o[a]) !== null && _b !== void 0 ? _b : (o[a] = 1);
class Base {
    method() { }
}
class Derived extends Base {
    async m() { var _a; return (_a = super.method) === null || _a === void 0 ? void 0 : _a.call(this); }
}
let x = 1;
exports.x = x;
function foo(y) { if (y <= (exports.x = (_a = x++, x), _a))
    return y <= (exports.x = ++x); exports.x = (x--, x); exports.x = --x; }
