// past ternts bugs, each kept as a case
export function castThenChain(x: unknown) {
  return (
    x as { y?: { z: number } })?.y?.z;
}
;
export const sep = `a${"\u0000"}b`;
export const re = /['"]/g, div = 4 / 2 / 1;
export const template = `x${`nested${1}`}y`;
export function generic<T extends { a: number }>(t: T) { return t.a < 2 && t.a > 0; }
export const arrow = async <T,>(x: T) => x;
let a = 1, b = 2;
export const cmp = a < b ? (b > a ? 1 : 2) : 3;
export class WithSuper extends Array<number> {
  x = 1;
  constructor(public p: number) { super(); }
}
label: for (const k in { a: 1 }) { if (k) continue label; }
export default function () { return 0; }
