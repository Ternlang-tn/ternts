// a lowered async method's super helpers are _super_1 / _superIndex_1 when the file has the
// names (the same in every method), so the method's own _super stays its own
const _super = { x: () => "mine" };
class A { x() { return "a"; } }
class B extends A {
  async m() { const own = _super.x(); return super.x() + super["x"]() + own; }
  async n() { return super.x(); }
}
