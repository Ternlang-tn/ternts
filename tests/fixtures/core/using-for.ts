// for (using ...; ;) and for await (using ... of) below ESNext, as tsc
for (using d1 = { [Symbol.dispose]() {} }, d2 = null, d3 = undefined;;) {
}
function f() { for (using a = null, b = x(); a; g()) h(a, b); }
async function af() { for (await using a = null; ; ) { break; } }
async function fa(xs: any) { for await (using d of xs) { f(d); } for await (await using e of xs) g(e); }
