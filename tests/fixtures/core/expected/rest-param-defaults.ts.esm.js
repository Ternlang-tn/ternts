function f({ a, ...x }, b = a) { return b; }
function h(c = 1, { a, ...x }, d = 2, [e] = [3], ...r) { return [c, a, d, e, x, r]; }
const k = ({ a, ...x } = {}, d = a) => d;
