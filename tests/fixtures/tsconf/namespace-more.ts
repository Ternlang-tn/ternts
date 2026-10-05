// a byte order mark, a temp inside a namespace, export import in a namespace, overloads
module M { export var [a, b] = [1, 2]; }
module Z.Q { export function bar() { return ""; } }
module A.Q { export import Q = Z.Q; Q.bar(); }
module F { function foo(); }
