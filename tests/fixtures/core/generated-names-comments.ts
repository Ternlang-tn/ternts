// xs_1 and xs_2 in a comment, and "xs_3" in a string
const s = "xs_3";
async function f(xs, y = 1) { for await (const a of xs) {} }
