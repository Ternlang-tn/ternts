import { baz } from "./bar";
import * as ns from "./ns";
import def from "./def";
let v = baz;
let w = baz;
let s = { a: 1 };
let n = v.thing;
const fn = (x) => true;
function assertIs(x) { }
export const out = [v, w, s, n, fn, ns.value, def, assertIs];
export function opt(a, ...rest) { }
class A {
}
let tpl = `a${1}`;
let tup = [1];
