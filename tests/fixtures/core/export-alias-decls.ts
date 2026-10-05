// exported declarations an export list exports again: an enum's / namespace's names go in its
// IIFE (exports.E1 = exports.E = E = {}), `export import a = M.x` gets exports.a1 = exports.a
// (was missing); a class in a #private field is named "#foo"
export enum E { A, B }
export namespace M { export var x = 1; }
export import a = M.x;
export { E as E1, M as M1, a as a1 };
class C { #foo = class { static s = 1; }; get() { return this.#foo; } }
