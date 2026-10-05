let { [order(0)]: { [order(2)]: z } = order(1), ...w } = {};
let { a: [c] = order(1), ...w3 } = obj;
let { prop = { ...obj }, more = { ...obj } = { ...obj }, ...rest } = obj;
let { a2 = ({ ...b } = obj), ...r2 } = obj;
let { a4 = (x) => { ({ ...b } = obj); }, ...r4 } = obj;
let { [k]: x5 = 1, ...r5 } = obj;
let { a6: { b6 } = 1, ...r6 } = obj;
let { a8: { ...b8 } = order(1), ...r8 } = obj;
let [{ ...b10 } = order(1)] = obj;
let [{ ...a11 }, b11 = a11] = [{ x: 1 }];
({ ...b } = obj);
f(({ ...b } = obj));
let q = ({ ...b } = f());
for (({ ...b } = obj);;)
    break;
if (f)
    ({ ...b } = obj);
var p1;
({ p1 = { ...obj } } = obj);
async function* g() { yield 1; }
({ x: { a, ...b } = d } = c);
