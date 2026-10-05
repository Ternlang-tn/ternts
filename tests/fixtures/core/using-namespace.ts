// `using` in a namespace's body: all of the body in the try, as for a block
namespace N {
  const a = 0;
  using d18 = { [Symbol.dispose]() {} };
  export const x = 1;
  let y = 2;
  export function f() { return y; }
  class C {}
  export class D {}
  export namespace M { export const z = 1; }
  export enum E { A }
}
