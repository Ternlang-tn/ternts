// helpers in tsc's order: the ones with a priority first (__awaiter: 5), then the rest as the
// transforms ask (class fields: a method's #private read before an instance field's class)
const X = class { static s = 1; };
async function f() {}
class C { #p = 1; #k = class { static t = 2; }; m() { return this.#p; } }
