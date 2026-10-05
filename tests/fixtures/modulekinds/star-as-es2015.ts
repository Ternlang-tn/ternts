// module es2015 hasn't `export * as ns` (ES2020): an import and an export, `export default`
// for `as default`, a generated name for a string name; commonjs: `as default` is in the
// void 0 list, and string export names are exports["a-b"] (was exports."a-b": invalid)
export * as ns from "./a";
export * as default from "./b";
export * as "a-b" from "./c";
export { "c-d" as cd, "e-f" as "g-h" } from "./d";
function f() {}
class K {}
let v = 1;
v = 2;
export { f as "f-f", K as "k-k", v as "v-v" };
