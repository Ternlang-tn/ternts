// ++x of an `export let x` an export list exports again, in a file whose expressions are
// lowered as trees (?. below ES2020): exports.x2 = ++exports.x, reprinted or not
export let a = 1;
let o: any;
function f() { a++; return ++a + 1; }
function g() { return ++a + o?.x; }
function h() { return (a = 3) + o?.x; }
export { a as a2 };
