declare const foo: number, x: string;
// syntactically string enum initializers have no reverse mapping
enum A { a = `${foo}`, b = "a" + x, c = x + `t${foo}`, d = foo + 1, e = x, f = ("q") + x }
// conditional types inside parentheses and type arguments after extends
type T<X> = any extends ((A extends B ? C : D) extends any ? F<X extends 1 ? 2 : 3> : any) ? any : any;
let z = 1;
