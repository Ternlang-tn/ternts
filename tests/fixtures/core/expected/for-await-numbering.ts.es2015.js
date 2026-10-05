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
Object.defineProperty(exports, "__esModule", { value: true });
function f(xs_1) {
    return __awaiter(this, arguments, void 0, function* (xs, y = 1) { var _a, xs_2, xs_2_1, _b, xs_3, xs_3_1; var _c, e_1, _d, _e, _f, e_2, _g, _h; try {
        for (_a = true, xs_2 = __asyncValues(xs); xs_2_1 = yield xs_2.next(), _c = xs_2_1.done, !_c; _a = true) {
            _e = xs_2_1.value;
            _a = false;
            const a = _e;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_a && !_c && (_d = xs_2.return)) yield _d.call(xs_2);
        }
        finally { if (e_1) throw e_1.error; }
    } try {
        for (_b = true, xs_3 = __asyncValues(xs); xs_3_1 = yield xs_3.next(), _f = xs_3_1.done, !_f; _b = true) {
            _h = xs_3_1.value;
            _b = false;
            const b = _h;
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (!_b && !_f && (_g = xs_3.return)) yield _g.call(xs_3);
        }
        finally { if (e_2) throw e_2.error; }
    } });
}
test("x", () => __awaiter(void 0, void 0, void 0, function* () { var _a, e_3, _b, _c; try {
    for (var _d = true, ys_1 = __asyncValues(ys), ys_1_1; ys_1_1 = yield ys_1.next(), _a = ys_1_1.done, !_a; _d = true) {
        _c = ys_1_1.value;
        _d = false;
        const a = _c;
    }
}
catch (e_3_1) { e_3 = { error: e_3_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = ys_1.return)) yield _b.call(ys_1);
    }
    finally { if (e_3) throw e_3.error; }
} }));
test("y", () => __awaiter(void 0, void 0, void 0, function* () { var _a, e_4, _b, _c; try {
    for (var _d = true, ys_2 = __asyncValues(ys), ys_2_1; ys_2_1 = yield ys_2.next(), _a = ys_2_1.done, !_a; _d = true) {
        _c = ys_2_1.value;
        _d = false;
        const a = _c;
    }
}
catch (e_4_1) { e_4 = { error: e_4_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = ys_2.return)) yield _b.call(ys_2);
    }
    finally { if (e_4) throw e_4.error; }
} }));
