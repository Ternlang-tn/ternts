// cases from past fixes (commit in each comment)
import { Injectable, Prop } from "@nestjs/common";
import { K, O } from "./keys";
import { Item } from "./item";
// 07ba2e7: typeof C inside an object type in a decorated class uses the class alias
@Injectable()
export class SelfRef {
  private p: { v: typeof SelfRef } = { v: SelfRef };
  static make() { return new SelfRef(); }
}
// 8f64024: a computed key in an object type is a value use of K (its import stays)
export interface Keyed { [K.a]: string }
// 8f64024: decorated computed fields evaluate the key once
let n = 0;
export class Computed {
  @Prop() [`k${n++}`]: string;
}
// 8f64024: rest parameter metadata from the type argument
export class Rest {
  @Prop() m(...xs: Array<number>) {}
  @Prop() s(...xs: Item<"s">) {}
  constructor(...args: string[]) {}
}
// 8f64024: an alias to an indexed access on an unresolved (imported) type
type Indexed = O["k"];
export class UsesIndexed { @Prop() i: Indexed; }
// 8f64024: function type parameters are Object in metadata inside the function
export function factory<T>() {
  class Inner { @Prop() t: T; }
  return Inner;
}
// 987e4a2: super() not a statement of its own (minified) gets field assignments first
class Base { constructor(..._: any[]) {} }
export class Minified extends Base {
  x = 1;
  constructor(public y: number) { super(), this.extra(); }
  extra() {}
}
