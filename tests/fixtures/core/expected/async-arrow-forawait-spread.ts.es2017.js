var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
const g = async (it) => { var _a, e_1, _b, _c; try {
    for (var _d = true, it_1 = __asyncValues(it), it_1_1; it_1_1 = await it_1.next(), _a = it_1_1.done, !_a; _d = true) {
        _c = it_1_1.value;
        _d = false;
        const a = _c;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = it_1.return)) await _b.call(it_1);
    }
    finally { if (e_1) throw e_1.error; }
} };
const h = async (it) => { var _a, e_2, _b, _c; try {
    for (var _d = true, it_2 = __asyncValues(it), it_2_1; it_2_1 = await it_2.next(), _a = it_2_1.done, !_a; _d = true) {
        _c = it_2_1.value;
        _d = false;
        const a = _c;
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = it_2.return)) await _b.call(it_2);
    }
    finally { if (e_2) throw e_2.error; }
} };
const c = Object.assign(Object.assign(Object.assign({}, a), b), { g: true, h: 1 });
const e = Object.assign({ g: 1 });
