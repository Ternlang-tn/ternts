// a switch with `using` among the module's statements after a top-level `using`: its env is
// declared with the module's hoisted names (var d1, env_1) and assigned, as tsc
declare const k: number;
using d1 = { [Symbol.dispose]() {} };
const a = 1;
switch (k) {
  case 0:
    using d2 = { [Symbol.dispose]() {} };
    break;
}
if (a) switch (k) { case 1: using d3 = { [Symbol.dispose]() {} }; }
export {};
