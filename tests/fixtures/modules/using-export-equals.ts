// top-level `using` with export = e: _default = e in the try, module.exports = _default after

using z = { [Symbol.dispose]() {} };

const y = 2;

console.log(y, z);
export = y;
