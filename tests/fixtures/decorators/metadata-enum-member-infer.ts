// metadata of an enum member's type is its value's (E.A: Number, S.A: String; a union of
// them too), and a conditional type's `infer X` is a type parameter in its true type (Object,
// no typeof guard of an undeclared X)
declare function d(): PropertyDecorator;
enum E { A, B, C }
enum S { A = "a", B = "b" }
enum H { A = 1, B = "b" }
class K<T> {
  @d() a: E.A;
  @d() b: E.B | E.C;
  @d() s: S.A;
  @d() u: S.A | S.B;
  @d() h: H.B;
  @d() h2: H.A;
  @d() mixed: E.A | S.A;
  @d() c: T extends { attributes: infer A } ? A : undefined;
  @d() c2: T extends Array<infer U> ? U : string;
  @d() c3: number extends string ? false : true;
}
