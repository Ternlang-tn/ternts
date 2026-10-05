export let a = 1;
let o;
function f() { a++; return ++a + 1; }
function g() { return ++a + o?.x; }
function h() { return (a = 3) + o?.x; }
export { a as a2 };
