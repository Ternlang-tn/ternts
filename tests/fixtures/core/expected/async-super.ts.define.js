class A {
    m(x) { return 1; }
    get g() { return 2; }
    set s(v) { }
    static st() { return 3; }
}
class B extends A {
    run() {
        const f = async () => super.m() + super.g;
        const g = async () => { const h = async () => super.m(1); return h(); };
        return [f, g];
    }
    async both() { const k = async () => super.m(); return super.g + await k(); }
    assign() { const f = async () => { super.s = 5; }; return f; }
    static stat() { return async () => super.st(); }
    plain() { return super.m(); }
}
const o = { __proto__: { z() { return 1; } }, y() { return async () => super.z(); } };
