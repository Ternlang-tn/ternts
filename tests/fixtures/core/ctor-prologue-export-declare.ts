// a constructor's directive prologue stays first (parameter properties after it); reads of
// an `export declare let` go through exports
class Foo2 {
    constructor(private A: string, private B: string) {
        "ngInject1";
        "ngInject2";
        console.log(1);
    }
}
export declare let a: { __foo: 10 };
a.__foo;
namespace N { export declare let q: number; export const r = q + 1; }
