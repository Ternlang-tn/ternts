// `this` in a computed key of an object literal in a moved static stays (tsc doesn't rewrite
// it there); x! ?? y and x as T ?? y take a temp, as (x) ?? y does
declare let a: any;
class W {
    static X = "x";
    static P = { [this.X]: 1 };
    static Q = this.X;
}
const x2 = a! ?? 1;
const x4 = a as any ?? 1;
const x7 = a!?.b;
