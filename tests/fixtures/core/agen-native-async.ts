// at ES2017 an async generator is lowered but async functions and arrows inside it aren't: their
// awaits stay (they were written as yield __await(...), outside any generator)
class K {
    async *g(t: any) {
        yield 1;
        (async () => { const m = await t; })();
        const f = async x => await x;
        async function h() { await t; }
        function q() { return 1; }
    }
}
