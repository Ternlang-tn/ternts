function f({ a, ...r }, { "q": x, b }, [c, , ...d], { e = 1 } = {}) { return [a, r, x, b, c, d, e]; }
const g = ({ k, ...rest } = {}) => [k, rest];
function f2({ a, ...r }, { e = 1, g: { h } }, [c = 2, [d]], { k } = {}, [m] = []) { return 1; }
