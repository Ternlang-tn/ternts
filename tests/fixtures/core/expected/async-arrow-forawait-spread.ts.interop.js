const g = async (it) => { for await (const a of it) { } };
const h = async (it) => { for await (const a of it) { } };
const c = { ...a, ...b, ...{ g: true, h: 1 } };
const e = { ...{ g: 1 } };
