"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
async function f(xs, y = 1) { var _a, e_1, _b, _c, _d, e_2, _e, _f; try {
    for (var _g = true, xs_1 = __asyncValues(xs), xs_1_1; xs_1_1 = await xs_1.next(), _a = xs_1_1.done, !_a; _g = true) {
        _c = xs_1_1.value;
        _g = false;
        const a = _c;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (!_g && !_a && (_b = xs_1.return)) await _b.call(xs_1);
    }
    finally { if (e_1) throw e_1.error; }
} try {
    for (var _h = true, xs_2 = __asyncValues(xs), xs_2_1; xs_2_1 = await xs_2.next(), _d = xs_2_1.done, !_d; _h = true) {
        _f = xs_2_1.value;
        _h = false;
        const b = _f;
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (!_h && !_d && (_e = xs_2.return)) await _e.call(xs_2);
    }
    finally { if (e_2) throw e_2.error; }
} }
test("x", async () => { var _a, e_3, _b, _c; try {
    for (var _d = true, ys_1 = __asyncValues(ys), ys_1_1; ys_1_1 = await ys_1.next(), _a = ys_1_1.done, !_a; _d = true) {
        _c = ys_1_1.value;
        _d = false;
        const a = _c;
    }
}
catch (e_3_1) { e_3 = { error: e_3_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = ys_1.return)) await _b.call(ys_1);
    }
    finally { if (e_3) throw e_3.error; }
} });
test("y", async () => { var _a, e_4, _b, _c; try {
    for (var _d = true, ys_2 = __asyncValues(ys), ys_2_1; ys_2_1 = await ys_2.next(), _a = ys_2_1.done, !_a; _d = true) {
        _c = ys_2_1.value;
        _d = false;
        const a = _c;
    }
}
catch (e_4_1) { e_4 = { error: e_4_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = ys_2.return)) await _b.call(ys_2);
    }
    finally { if (e_4) throw e_4.error; }
} });
