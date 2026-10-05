// unnamed export default classes that need a name: decorated members (legacy) and statics
// moved out below ES2022 (tsc names it default_1)
declare function dec(t: any, k: string, d?: any): any;
export default class {
  @dec method() {}
  static z = "Foo";
}
