class B {
    m(x) { return x; }
}
class K extends B {
    async m2(variables) {
        const ps = [1].map(async (r) => { const variables = g(); for await (const v of variables) { } });
        for await (const v of variables) { }
        return super.m(1);
    }
}
async function f(xs) { for await (const a of xs) { } }
async function* h(xs, y = 1) { for await (const a of xs) { } }
