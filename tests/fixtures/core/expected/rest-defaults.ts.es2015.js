var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
var _a, _b, _c, _d;
let _e = {}, _f = order(0), _g = _e[_f], _h = _g === void 0 ? order(1) : _g, _j = order(2), z = _h[_j], w = __rest(_e, [typeof _f === "symbol" ? _f : _f + ""]);
let { a: [c] = order(1) } = obj, w3 = __rest(obj, ["a"]);
let { prop = Object.assign({}, obj) } = obj, _k = obj.more, more = _k === void 0 ? (_a = Object.assign({}, obj), obj = __rest(_a, []), _a) : _k, rest = __rest(obj, ["prop", "more"]);
let _l = obj.a2, a2 = _l === void 0 ? (b = __rest(obj, []), obj) : _l, r2 = __rest(obj, ["a2"]);
let { a4 = (x) => { (b = __rest(obj, [])); } } = obj, r4 = __rest(obj, ["a4"]);
let _m = obj, _o = k, _p = _m[_o], x5 = _p === void 0 ? 1 : _p, r5 = __rest(_m, [typeof _o === "symbol" ? _o : _o + ""]);
let { a6: { b6 } = 1 } = obj, r6 = __rest(obj, ["a6"]);
let _q = obj.a8, _r = _q === void 0 ? order(1) : _q, b8 = __rest(_r, []), r8 = __rest(obj, ["a8"]);
let [_s] = obj, _t = _s === void 0 ? order(1) : _s, b10 = __rest(_t, []);
let [_u, _v] = [{ x: 1 }], a11 = __rest(_u, []), b11 = _v === void 0 ? a11 : _v;
(b = __rest(obj, []));
f((b = __rest(obj, []), obj));
let q = (_b = f(), b = __rest(_b, []), _b);
for ((b = __rest(obj, []));;)
    break;
if (f)
    (b = __rest(obj, []));
var p1;
({ p1 = Object.assign({}, obj) } = obj);
function g() { return __asyncGenerator(this, arguments, function* g_1() { yield yield __await(1); }); }
(_c = c.x, _d = _c === void 0 ? d : _c, { a } = _d, b = __rest(_d, ["a"]));
