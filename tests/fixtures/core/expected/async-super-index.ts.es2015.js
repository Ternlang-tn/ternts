var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
class A {
    x() {
    }
    y() {
    }
}
class B extends A {
    simple() {
        const _superIndex = name => super[name];
        const _super = Object.create(null, {
            x: { get: () => super.x },
            y: { get: () => super.y }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.x.call(this);
            _super.y.call(this);
            _superIndex("x").call(this);
            const a = _super.x;
            const b = _superIndex("x");
        });
    }
    advanced() {
        const _superIndex = (function (geti, seti) {
            const cache = Object.create(null);
            return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
        })(name => super[name], (name, value) => super[name] = value);
        const _super = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const f = () => { };
            _super.x.call(this);
            _superIndex("x").value.call(this);
            const a = _super.x;
            const b = _superIndex("x").value;
            _super.x = f;
            _superIndex("x").value = f;
            ({ f: _super.x } = { f });
            ({ f: _superIndex("x").value } = { f });
            (() => _super.x.call(this));
            (() => _superIndex("x").value.call(this));
            (() => __awaiter(this, void 0, void 0, function* () { return _super.x.call(this); }));
            (() => __awaiter(this, void 0, void 0, function* () { return _superIndex("x").value.call(this); }));
        });
    }
    property_access_only_read_only() {
        const _super = Object.create(null, {
            x: { get: () => super.x }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.x.call(this);
            const a = _super.x;
            (() => _super.x.call(this));
            (() => __awaiter(this, void 0, void 0, function* () { return _super.x.call(this); }));
        });
    }
    property_access_only_write_only() {
        const _super = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const f = () => { };
            _super.x = f;
            ({ f: _super.x } = { f });
            (() => _super.x = f);
            (() => __awaiter(this, void 0, void 0, function* () { return _super.x = f; }));
        });
    }
    element_access_only_read_only() {
        const _superIndex = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            _superIndex("x").call(this);
            const a = _superIndex("x");
            (() => _superIndex("x").call(this));
            (() => __awaiter(this, void 0, void 0, function* () { return _superIndex("x").call(this); }));
        });
    }
    element_access_only_write_only() {
        const _superIndex = (function (geti, seti) {
            const cache = Object.create(null);
            return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
        })(name => super[name], (name, value) => super[name] = value);
        return __awaiter(this, void 0, void 0, function* () {
            const f = () => { };
            _superIndex("x").value = f;
            ({ f: _superIndex("x").value } = { f });
            (() => _superIndex("x").value = f);
            (() => __awaiter(this, void 0, void 0, function* () { return _superIndex("x").value = f; }));
        });
    }
    property_access_only_read_only_in_generator() {
        const _super = Object.create(null, {
            x: { get: () => super.x }
        });
        return __asyncGenerator(this, arguments, function* property_access_only_read_only_in_generator_1() {
            _super.x.call(this);
            const a = _super.x;
            (() => _super.x.call(this));
            (() => __awaiter(this, void 0, void 0, function* () { return _super.x.call(this); }));
        });
    }
    property_access_only_write_only_in_generator() {
        const _super = Object.create(null, {
            x: { get: () => super.x, set: v => super.x = v }
        });
        return __asyncGenerator(this, arguments, function* property_access_only_write_only_in_generator_1() {
            const f = () => { };
            _super.x = f;
            ({ f: _super.x } = { f });
            (() => _super.x = f);
            (() => __awaiter(this, void 0, void 0, function* () { return _super.x = f; }));
        });
    }
    element_access_only_read_only_in_generator() {
        const _superIndex = name => super[name];
        const _super = Object.create(null, {});
        return __asyncGenerator(this, arguments, function* element_access_only_read_only_in_generator_1() {
            _superIndex("x").call(this);
            const a = _superIndex("x");
            (() => _superIndex("x").call(this));
            (() => __awaiter(this, void 0, void 0, function* () { return _superIndex("x").call(this); }));
        });
    }
    element_access_only_write_only_in_generator() {
        const _superIndex = (function (geti, seti) {
            const cache = Object.create(null);
            return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
        })(name => super[name], (name, value) => super[name] = value);
        const _super = Object.create(null, {});
        return __asyncGenerator(this, arguments, function* element_access_only_write_only_in_generator_1() {
            const f = () => { };
            _superIndex("x").value = f;
            ({ f: _superIndex("x").value } = { f });
            (() => _superIndex("x").value = f);
            (() => __awaiter(this, void 0, void 0, function* () { return _superIndex("x").value = f; }));
        });
    }
}
class Base {
    set setter(x) { }
    get getter() { return; }
    method(x) { }
    static set setter(x) { }
    static get getter() { return; }
    static method(x) { }
}
class Derived extends Base {
    a() { const _super = Object.create(null, {
        method: { get: () => super.method }
    }); return () => __awaiter(this, void 0, void 0, function* () { return _super.method.call(this, ''); }); }
    b() { const _super = Object.create(null, {
        getter: { get: () => super.getter }
    }); return () => __awaiter(this, void 0, void 0, function* () { return _super.getter; }); }
    c() { const _super = Object.create(null, {
        setter: { get: () => super.setter, set: v => super.setter = v }
    }); return () => __awaiter(this, void 0, void 0, function* () { return _super.setter = ''; }); }
    d() {
        const _superIndex = name => super[name];
        return () => __awaiter(this, void 0, void 0, function* () { return _superIndex("method").call(this, ''); });
    }
    e() {
        const _superIndex = name => super[name];
        return () => __awaiter(this, void 0, void 0, function* () { return _superIndex("getter"); });
    }
    f() {
        const _superIndex = (function (geti, seti) {
            const cache = Object.create(null);
            return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
        })(name => super[name], (name, value) => super[name] = value);
        return () => __awaiter(this, void 0, void 0, function* () { return _superIndex("setter").value = ''; });
    }
    static a() { const _super = Object.create(null, {
        method: { get: () => super.method }
    }); return () => __awaiter(this, void 0, void 0, function* () { return _super.method.call(this, ''); }); }
    static b() { const _super = Object.create(null, {
        getter: { get: () => super.getter }
    }); return () => __awaiter(this, void 0, void 0, function* () { return _super.getter; }); }
    static c() { const _super = Object.create(null, {
        setter: { get: () => super.setter, set: v => super.setter = v }
    }); return () => __awaiter(this, void 0, void 0, function* () { return _super.setter = ''; }); }
    static d() {
        const _superIndex = name => super[name];
        return () => __awaiter(this, void 0, void 0, function* () { return _superIndex("method").call(this, ''); });
    }
    static e() {
        const _superIndex = name => super[name];
        return () => __awaiter(this, void 0, void 0, function* () { return _superIndex("getter"); });
    }
    static f() {
        const _superIndex = (function (geti, seti) {
            const cache = Object.create(null);
            return name => cache[name] || (cache[name] = { get value() { return geti(name); }, set value(v) { seti(name, v); } });
        })(name => super[name], (name, value) => super[name] = value);
        return () => __awaiter(this, void 0, void 0, function* () { return _superIndex("setter").value = ''; });
    }
}
