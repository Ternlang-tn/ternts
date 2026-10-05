// merged namespace declarations: a name another block exports is NS.name here; the IIFE
// parameter is renamed when the body binds the namespace's name anywhere
module my.data.foo {
  export function buz() { return 1; }
  export var count = 0;
}
module my.data {
  function data(my: number) {
    foo.buz();
    return my;
  }
}
namespace A { export class A {} }
namespace B { const f = (B: number) => B; export const g = f; }
namespace C { interface C {} export var z = 1; }
namespace D { module D {} export var w = 2; }
namespace Range { export const from = (r: vscode.Range): vscode.Range => r; export const g = (): Range => null; }
