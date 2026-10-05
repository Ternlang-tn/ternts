// object rest in a parameter below ES2018: the parameters after it that have defaults are
// assigned in the body, after its destructuring (a default may read its names: tsc #47079)
function f({ a, ...x }: any, b = a) { return b; }
function h(c = 1, { a, ...x }: any, d = 2, [e] = [3], ...r: any[]) { return [c, a, d, e, x, r]; }
const k = ({ a, ...x }: any = {}, d = a) => d;
