// no-semicolon style: a statement lowered to start with "(" after an object literal gets a ";";
// super.m?.() in a lowered async method keeps this; ++/-- of an export list's variable
// re-export it
declare let a: any, o: any
const q = {
  a
}
o[a] ??= 1
class Base { method?() {} }
class Derived extends Base { async m() { return super.method?.() } }
let x = 1
export function foo(y: number) { if (y <= x++) return y <= ++x; x--; --x }
export { x }
