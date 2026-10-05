"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    m() {
        const _super = Object.create(null, {
            method: { get: () => super.method }
        });
        return __awaiter(this, void 0, void 0, function* () { var _a; return (_a = _super.method) === null || _a === void 0 ? void 0 : _a.call(this); });
    }
}
let x = 1;
exports.x = x;
function foo(y) { if (y <= (exports.x = (_a = x++, x), _a))
    return y <= (exports.x = ++x); exports.x = (x--, x); exports.x = --x; }
