// enum members read through their namespaces' path (M.N.E1.a, from inside or outside) and
// with a template key (E[`V`]) fold as tsc folds them; a default export of a namespace with
// only types goes
enum E { V = 11, W = E[`V`], X = E[`V`] << 1 }
namespace M.N {
  export enum E1 { a = 1, b = 2 }
}
namespace M {
  export namespace N {
    export enum E2 { b = M.N.E1.a, c = N.E1["b"] | 4, d = M.N.E1[`b`] }
  }
}
enum F { A = M.N.E1.b }
namespace T { export interface I {} }
export default T;
