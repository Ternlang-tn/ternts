// an arrow with a return type in a conditional's first branch needs the conditional's `:`
// after it (tsc's allowReturnTypeInArrowFunction), or the `:` is the conditional's
declare let a: any, b: any, c: any, d: any;
let x1 = b ? (c) : d => d;
let x2 = a ? b ? c : (d) : (e: any) => e;
let x3 = a ? (b: any) => (c) : (d: any) => d;
let x4 = a ? (p: any): string => p : null;
let x5 = a ? (p: any): string => p : (q: any): number => q;
