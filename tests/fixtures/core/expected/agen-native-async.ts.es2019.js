class K {
    async *g(t) {
        yield 1;
        (async () => { const m = await t; })();
        const f = async (x) => await x;
        async function h() { await t; }
        function q() { return 1; }
    }
}
