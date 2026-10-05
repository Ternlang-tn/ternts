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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
class B {
    m(x) { return x; }
}
class K extends B {
    m2(variables) {
        const _super = Object.create(null, {
            m: { get: () => super.m }
        });
        return __awaiter(this, void 0, void 0, function* () {
            var _a, variables_1, variables_1_1;
            var _b, e_1, _c, _d;
            const ps = [1].map((r) => __awaiter(this, void 0, void 0, function* () { var _a, e_2, _b, _c; const variables = g(); try {
                for (var _d = true, variables_2 = __asyncValues(variables), variables_2_1; variables_2_1 = yield variables_2.next(), _a = variables_2_1.done, !_a; _d = true) {
                    _c = variables_2_1.value;
                    _d = false;
                    const v = _c;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = variables_2.return)) yield _b.call(variables_2);
                }
                finally { if (e_2) throw e_2.error; }
            } }));
            try {
                for (_a = true, variables_1 = __asyncValues(variables); variables_1_1 = yield variables_1.next(), _b = variables_1_1.done, !_b; _a = true) {
                    _d = variables_1_1.value;
                    _a = false;
                    const v = _d;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_a && !_b && (_c = variables_1.return)) yield _c.call(variables_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return _super.m.call(this, 1);
        });
    }
}
function f(xs) {
    return __awaiter(this, void 0, void 0, function* () { var _a, xs_1, xs_1_1; var _b, e_3, _c, _d; try {
        for (_a = true, xs_1 = __asyncValues(xs); xs_1_1 = yield xs_1.next(), _b = xs_1_1.done, !_b; _a = true) {
            _d = xs_1_1.value;
            _a = false;
            const a = _d;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (!_a && !_b && (_c = xs_1.return)) yield _c.call(xs_1);
        }
        finally { if (e_3) throw e_3.error; }
    } });
}
function h(xs_2) { return __asyncGenerator(this, arguments, function* h_1(xs, y = 1) { var _a, e_4, _b, _c; try {
    for (var _d = true, _e = __asyncValues(xs), _f; _f = yield __await(_e.next()), _a = _f.done, !_a; _d = true) {
        _c = _f.value;
        _d = false;
        const a = _c;
    }
}
catch (e_4_1) { e_4 = { error: e_4_1 }; }
finally {
    try {
        if (!_d && !_a && (_b = _e.return)) yield __await(_b.call(_e));
    }
    finally { if (e_4) throw e_4.error; }
} }); }
