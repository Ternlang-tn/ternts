"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntries = getEntries;
async function getEntries(dir = process.cwd()) {
    var _a, e_1, _b, _c, _d, e_2, _e, _f;
    try {
        for (var _g = true, _h = __asyncValues(g(dir)), _j; _j = await _h.next(), _a = _j.done, !_a; _g = true) {
            _c = _j.value;
            _g = false;
            const a = _c;
            try {
                for (var _k = true, _l = (e_2 = void 0, __asyncValues(g(a))), _m; _m = await _l.next(), _d = _m.done, !_d; _k = true) {
                    _f = _m.value;
                    _k = false;
                    const b = _f;
                    console.log(b);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_k && !_d && (_e = _l.return)) await _e.call(_l);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_g && !_a && (_b = _h.return)) await _b.call(_h);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
const f = async (_, { a }) => a;
