// generated names in tsc's print order: a function's own (its parameter copies, its for await
// names) before the functions inside it; copies avoid the unique names, not other functions'
// copies; super.m<T>() in a lowered async method; for await of `x as T` takes temps
class B { m<T>(x: T) { return x; } }
class K extends B {
    async m2(variables: any) {
        const ps = [1].map(async (r) => { const variables = g(); for await (const v of variables) {} });
        for await (const v of variables) {}
        return super.m<number>(1);
    }
}
async function f(xs: any) { for await (const a of xs) {} }
async function* h(xs: any, y = 1) { for await (const a of xs as AsyncIterable<any>) {} }
declare function g(): any;
