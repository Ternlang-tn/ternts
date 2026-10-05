// super.x as a destructuring target in static initializers below ES2022: a setter object
class A { static a = 1; }
class C extends A {
  static z8 = [super.a] = [0];
  static z9 = [super["a"] = 1] = [0];
  static z10 = [...super.a] = [0];
  static z11 = { x: super.a } = { x: 0 };
  static z12 = { x: super["a"] = 1 } = { x: 0 };
  static z13 = { ...super.a } = { x: 0 };
}
class A2 { static a = 1; }
class C2 extends A2 {
  static v1 = [super.a];
  static v2 = f([super.a], 1);
  static v3 = { x: super.a };
  static v4 = (super.a, 2);
}
declare function f(...a: any[]): any;
