a = 5;
export let a = 1, c = 2;
a += 2;
a++;
++a;
let v = a++;
function f() { a = 3; let z = a++; }
export function g() { return a++; }
c = 9;
export { a as a2, a as a3 };
let n = 0;
n = 1;
export { n };
function h() { return n--; }
export { n as m };
