function Prop(): any {}
export class A {
  @Prop() get value(): number { return 1; }
  set value(v: number) {}
  @Prop() get onlyGet(): string { return ""; }
  @Prop() set onlySet(v: boolean) {}
}
// the pair's design:type comes from whichever half is annotated
export class B {
  @Prop() get x() { return 1; }
  set x(v: number) {}
  @Prop() set y(v) {}
  get y(): string { return ""; }
  @Prop() static get z() { return 1; }
  static set z(v: boolean) {}
}
