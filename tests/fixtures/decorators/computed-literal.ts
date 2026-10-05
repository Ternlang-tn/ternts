function Prop(): any {}
export class A {
  @Prop() ["plain"]: number;
  @Prop() [1]: string;
  @Prop() normal: boolean;
}
function P(): any {}
const k = "z";
export class Keys {
  ["a"] = 1;
  [2] = 2;
  static ["s"] = 3;
  @P() ["d"] = 4;
  @P() [k] = 5;
  [`t`] = 6;
  [-1] = 7;
}
