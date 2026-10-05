// a class expression's temp is declared where tsc makes it: before the #names when a static
// `this` comes first (named evaluation's __setFunctionName block for `const D = class` with
// statics), else after them; instances' WeakMaps before __setFunctionName in the list after it
const A = class { static s = 1; #x = 1; };
const B = class E { static s = 1; #x = 1; };
const C = class { #x = 1; };
declare function f(c: any): void;
f(class { #x = 1; static s = 1; });
