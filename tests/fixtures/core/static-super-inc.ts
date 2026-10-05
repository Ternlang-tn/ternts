// super.x++ / --super.x in static initializers and blocks below ES2022 (prefix forms wrote
// --Reflect.get(...), an invalid target)
class A { static x = 1; }
class B extends A {
  static a = super.x++;
  static b = --super.x;
  static c = super["x"]++;
  static { super.x++; ++super.x; }
}
class A2 { static x = 1; }
class B2 extends A2 {
  static { const q = super.x++; }
}
declare class B3 { static a: any; }
declare function k(): string;
class C3 extends B3 {
  static y5 = this?.[("x")]();
  static z5 = super.a = 0;
  static z6 = super.a += 1;
  static z14 = ++super.a;
  static z16 = ++super[("a")];
  static z17 = super[k()]++;
  static z18 = super.a``;
  static { super.a = 1; super[k()]++; }
}
