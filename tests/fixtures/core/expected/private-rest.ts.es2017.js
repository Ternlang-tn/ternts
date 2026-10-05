var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
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
var _Test_instances, _Test_value_set, _Test_only_get;
class Test {
    constructor() {
        _Test_instances.add(this);
    }
    m() {
        var _a;
        var _b, _c;
        const foo = { bar: 1 };
        console.log(__classPrivateFieldGet(this, _Test_instances, "a"));
        __classPrivateFieldSet(this, _Test_instances, 2, "a");
        (_b = this, ({ set value(_a) { __classPrivateFieldSet(_b, _Test_instances, _a, "a", _Test_value_set); } }).value = __rest({ foo }, []));
        (__classPrivateFieldGet(this, _Test_instances, "a").foo = __rest({ foo }.foo, []));
        let r = (_c = this, _a = { foo }, ({ set value(_a) { __classPrivateFieldSet(_c, _Test_instances, _a, "a", _Test_value_set); } }).value = __rest(_a, []), _a);
    }
}
_Test_instances = new WeakSet(), _Test_value_set = function _Test_value_set(v) { }, _Test_only_get = function _Test_only_get() { return 1; };
