class A {
    x() {
    }
    y() {
    }
}
class B extends A {
    async simple() {
        super.x();
        super.y();
        super["x"]();
        const a = super.x;
        const b = super["x"];
    }
    async advanced() {
        const f = () => { };
        super.x();
        super["x"]();
        const a = super.x;
        const b = super["x"];
        super.x = f;
        super["x"] = f;
        ({ f: super.x } = { f });
        ({ f: super["x"] } = { f });
        (() => super.x());
        (() => super["x"]());
        (async () => super.x());
        (async () => super["x"]());
    }
    async property_access_only_read_only() {
        super.x();
        const a = super.x;
        (() => super.x());
        (async () => super.x());
    }
    async property_access_only_write_only() {
        const f = () => { };
        super.x = f;
        ({ f: super.x } = { f });
        (() => super.x = f);
        (async () => super.x = f);
    }
    async element_access_only_read_only() {
        super["x"]();
        const a = super["x"];
        (() => super["x"]());
        (async () => super["x"]());
    }
    async element_access_only_write_only() {
        const f = () => { };
        super["x"] = f;
        ({ f: super["x"] } = { f });
        (() => super["x"] = f);
        (async () => super["x"] = f);
    }
    async *property_access_only_read_only_in_generator() {
        super.x();
        const a = super.x;
        (() => super.x());
        (async () => super.x());
    }
    async *property_access_only_write_only_in_generator() {
        const f = () => { };
        super.x = f;
        ({ f: super.x } = { f });
        (() => super.x = f);
        (async () => super.x = f);
    }
    async *element_access_only_read_only_in_generator() {
        super["x"]();
        const a = super["x"];
        (() => super["x"]());
        (async () => super["x"]());
    }
    async *element_access_only_write_only_in_generator() {
        const f = () => { };
        super["x"] = f;
        ({ f: super["x"] } = { f });
        (() => super["x"] = f);
        (async () => super["x"] = f);
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
    a() { return async () => super.method(''); }
    b() { return async () => super.getter; }
    c() { return async () => super.setter = ''; }
    d() { return async () => super["method"](''); }
    e() { return async () => super["getter"]; }
    f() { return async () => super["setter"] = ''; }
    static a() { return async () => super.method(''); }
    static b() { return async () => super.getter; }
    static c() { return async () => super.setter = ''; }
    static d() { return async () => super["method"](''); }
    static e() { return async () => super["getter"]; }
    static f() { return async () => super["setter"] = ''; }
}
