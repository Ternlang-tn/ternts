// for heads with patterns below ES2018: several declarators (was refused), object rest in a
// classic for's declarator (was kept: invalid there), and for-of as before
declare const a: any;
for (var {} = {}, {} = {}; false; void 0) {}
for (let { x, ...r } = a, [y] = a; false;) { console.log(x, r, y); }
for (var { p }: any = a, q = 1; false;) {}
for (const { m, ...rest } of [a]) { console.log(m, rest); }
