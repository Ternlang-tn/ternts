export abstract class Base<T> {
  protected abstract get(): T;
  static count = 0;
  #secret = 1;
  declare dummy: string;
  readonly ro: number = 2;
  field?: string;
  definite!: number;
  static { Base.count++; }
  constructor(public name: string, private readonly id?: number, protected tag = "t") {}
  get secret() { return this.#secret; }
  set secret(v) { this.#secret = v; }
  #priv() { return #secret in this; }
  method<U>(this: Base<T>, u: U): U { return u; }
  overloaded(x: string): string;
  overloaded(x: number): number;
  overloaded(x: any) { return x; }
}
export class Derived extends Base<number> {
  extra = this.name.length;
  constructor(name: string, public more: boolean) {
    console.log("before");
    super(name);
    console.log("after");
  }
  protected get() { return 1; }
  override method<U>(u: U): U { return super.method(u); }
}
class Accessors { accessor size = 3; static accessor total: number; }
export const anon = class implements Iterable<number> { *[Symbol.iterator]() { yield 1; } };
