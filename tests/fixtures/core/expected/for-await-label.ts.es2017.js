"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _a, e_1, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
async function f(y) { var _a, e_2, _b, _c; try {
    outer: for (var _d = true, y_1 = __asyncValues(y), y_1_1; y_1_1 = await y_1.next(), _a = y_1_1.done, !_a; _d = true) {
        _c = y_1_1.value;
        _d = false;
        const x = _c;
        continue outer;
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = y_1.return)) await _b.call(y_1);
    }
    finally { if (e_2) throw e_2.error; }
} }
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
