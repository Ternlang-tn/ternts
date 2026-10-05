var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
const s = "xs_3";
async function f(xs, y = 1) { var _a, e_1, _b, _c; try {
    for (var _d = true, xs_1 = __asyncValues(xs), xs_1_1; xs_1_1 = await xs_1.next(), _a = xs_1_1.done, !_a; _d = true) {
        _c = xs_1_1.value;
        _d = false;
        const a = _c;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = xs_1.return)) await _b.call(xs_1);
    }
    finally { if (e_1) throw e_1.error; }
} }
