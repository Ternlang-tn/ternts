const _super = { x: () => "mine" };
class A {
    x() { return "a"; }
}
class B extends A {
    async m() { const own = _super.x(); return super.x() + super["x"]() + own; }
    async n() { return super.x(); }
}
