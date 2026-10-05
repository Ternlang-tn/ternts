// parameters with object rest (and the other pattern parameters, as tsc then does) destructured
// in the body
function f({ a, ...r }: any, { "q": x, b }: any, [c, , ...d]: any[], { e = 1 }: any = {}) { return [a, r, x, b, c, d, e]; }
const g = ({ k, ...rest }: any = {}) => [k, rest];
function f2({ a, ...r }: any, { e = 1, g: { h } }: any, [c = 2, [d]]: any[], { k } = {} as any, [m] = []) { return 1; }
