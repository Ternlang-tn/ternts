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
    async simple() {
        _super.x.call(this);
        _super.y.call(this);
        _superIndex("x").call(this);
        const a = _super.x;
        const b = _superIndex("x");
    }
    async advanced() {
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
        (async () => _super.x.call(this));
        (async () => _superIndex("x").value.call(this));
    }
    async property_access_only_read_only() {
        _super.x.call(this);
        const a = _super.x;
        (() => _super.x.call(this));
        (async () => _super.x.call(this));
    }
    async property_access_only_write_only() {
        const f = () => { };
        _super.x = f;
        ({ f: _super.x } = { f });
        (() => _super.x = f);
        (async () => _super.x = f);
    }
    async element_access_only_read_only() {
        _superIndex("x").call(this);
        const a = _superIndex("x");
        (() => _superIndex("x").call(this));
        (async () => _superIndex("x").call(this));
    }
    async element_access_only_write_only() {
        const f = () => { };
        _superIndex("x").value = f;
        ({ f: _superIndex("x").value } = { f });
        (() => _superIndex("x").value = f);
        (async () => _superIndex("x").value = f);
    }
    property_access_only_read_only_in_generator() {
        const _super = Object.create(null, {
            x: { get: () => super.x }
        });
        return __asyncGenerator(this, arguments, function* property_access_only_read_only_in_generator_1() {
            _super.x.call(this);
            const a = _super.x;
            (() => _super.x.call(this));
            (async () => _super.x.call(this));
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
            (async () => _super.x = f);
        });
    }
    element_access_only_read_only_in_generator() {
        const _superIndex = name => super[name];
        const _super = Object.create(null, {});
        return __asyncGenerator(this, arguments, function* element_access_only_read_only_in_generator_1() {
            _superIndex("x").call(this);
            const a = _superIndex("x");
            (() => _superIndex("x").call(this));
            (async () => _superIndex("x").call(this));
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
            (async () => _superIndex("x").value = f);
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
    a() { return async () => _super.method.call(this, ''); }
    b() { return async () => _super.getter; }
    c() { return async () => _super.setter = ''; }
    d() { return async () => _superIndex("method").call(this, ''); }
    e() { return async () => _superIndex("getter"); }
    f() { return async () => _superIndex("setter").value = ''; }
    static a() { return async () => _super.method.call(this, ''); }
    static b() { return async () => _super.getter; }
    static c() { return async () => _super.setter = ''; }
    static d() { return async () => _superIndex("method").call(this, ''); }
    static e() { return async () => _superIndex("getter"); }
    static f() { return async () => _superIndex("setter").value = ''; }
}
