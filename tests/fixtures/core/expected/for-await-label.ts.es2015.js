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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _a, e_1, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
function f(y) {
    return __awaiter(this, void 0, void 0, function* () { var _a, y_1, y_1_1; var _b, e_2, _c, _d; try {
        outer: for (_a = true, y_1 = __asyncValues(y); y_1_1 = yield y_1.next(), _b = y_1_1.done, !_b; _a = true) {
            _d = y_1_1.value;
            _a = false;
            const x = _d;
            continue outer;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (!_a && !_b && (_c = y_1.return)) yield _c.call(y_1);
        }
        finally { if (e_2) throw e_2.error; }
    } });
}
try {
    for (var _d = true, _e = __asyncValues([Promise.resolve(1)]), _f; _f = await _e.next(), _a = _f.done, !_a; _d = true) {
        _c = _f.value;
        _d = false;
        const z = _c;
        z;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = _e.return)) await _b.call(_e);
    }
    finally { if (e_1) throw e_1.error; }
}
