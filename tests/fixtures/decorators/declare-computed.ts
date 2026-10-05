// a decorated `declare` field with a computed key: __decorate gets the key as written
declare function decorator(target: any, key: any): any;
const b = Symbol('b');
class Foo {
  @decorator declare a: number;
  @decorator declare [b]: number;
  @decorator declare ['x']: number;
}
