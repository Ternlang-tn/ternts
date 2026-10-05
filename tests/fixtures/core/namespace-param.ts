// a namespace's IIFE parameter keeps its name unless the body binds it: templates and
// parenthesized conditional branches in the body don't confuse the scan
export namespace N {
  export function f() { return `a${g(1)}b`; }
}
export namespace M {
  export const x = 1;
}
function h(c: any) { return c ? (N.f() || null) : null; }
export function M2(){}
const k = (N) => N;
export namespace P {
  export function f() { return 1; }
  export function h(c: any) { return c ? (P.f() || null) : null; }
  export const g = (a: any) => a ? (P) : 0;
}
