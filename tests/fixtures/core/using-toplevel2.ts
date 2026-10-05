// using at the top level of a module: hoisted names, the rest in one try block (tsc's esnext transform)
import { a } from "./a";
console.log(a);
using top = { [Symbol.dispose]() {} };
export class C {}
export default 5;
export function f() {}
let x = 1;
export const after = 2;
