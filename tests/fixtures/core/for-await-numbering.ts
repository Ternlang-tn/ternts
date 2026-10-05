// for await: e_N numbered in function order, arrows being functions too; parameter copies are
// named before the body's for await names
async function f(xs, y = 1) { for await (const a of xs) {} for await (const b of xs) {} }
test("x", async () => { for await (const a of ys) {} });
test("y", async () => { for await (const a of ys) {} });
export {};
