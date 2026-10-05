// `<<` opening type arguments whose first one is a generic function type; a function type's
// return type may be a conditional type inside a conditional's extends clause
type Bar = ReturnType<<T>(x: T) => number>;
declare const m: import("module").Modifier<<T>(x: T) => T>;
declare function foo<T>(_x: T): void;
declare let x: number, y: number;
const b = foo<<T>(x: T) => number>(() => 1);
const s = x << y;
export type IsEqual<A, B> = (<G>() => G extends A ? 1 : 2) extends <G>() => G extends B ? 1 : 2 ? true : false;
