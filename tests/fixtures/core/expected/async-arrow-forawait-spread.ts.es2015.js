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
const g = (it) => __awaiter(void 0, void 0, void 0, function* () { var _a, it_1, it_1_1; var _b, e_1, _c, _d; try {
    for (_a = true, it_1 = __asyncValues(it); it_1_1 = yield it_1.next(), _b = it_1_1.done, !_b; _a = true) {
        _d = it_1_1.value;
        _a = false;
        const a = _d;
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (!_a && !_b && (_c = it_1.return)) yield _c.call(it_1);
    }
    finally { if (e_1) throw e_1.error; }
} });
const h = (it) => __awaiter(void 0, void 0, void 0, function* () { var _a, it_2, it_2_1; var _b, e_2, _c, _d; try {
    for (_a = true, it_2 = __asyncValues(it); it_2_1 = yield it_2.next(), _b = it_2_1.done, !_b; _a = true) {
        _d = it_2_1.value;
        _a = false;
        const a = _d;
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try {
        if (!_a && !_b && (_c = it_2.return)) yield _c.call(it_2);
    }
    finally { if (e_2) throw e_2.error; }
} });
const c = Object.assign(Object.assign(Object.assign({}, a), b), { g: true, h: 1 });
const e = Object.assign({ g: 1 });
