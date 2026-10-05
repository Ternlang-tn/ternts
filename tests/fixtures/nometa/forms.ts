function dec(...args: any[]): any {}
@dec
@dec()
export class A {
  @dec static s = 1;
  @dec() i = 2;
  @dec accessor acc = 3;
  @dec ["computed" + 1]() {}
  m(@dec a: string, @dec() b?: number) {}
}
@dec class WithCtorParams { constructor(@dec readonly a: string, public b: number) {} }
