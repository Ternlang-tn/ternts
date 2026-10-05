// export import of a namespace without values: dropped (tsc only keeps value aliases),
// though the namespace stays instantiated
module A { export interface I { x: number } }
module B { export import A1 = A; }
module M { module N {} export import X = N; }
module Q { export const q = {}; }
module R { export import Q2 = Q; }
var x: B.A1.I = { x: 1 };
