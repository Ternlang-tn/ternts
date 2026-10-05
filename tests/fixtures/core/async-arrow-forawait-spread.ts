// for await of an async arrow's parameter hoists its names, as in a function; `{ ...{ a } }`
// alone below ES2018 is Object.assign({ a })
const g = async (it: any) => { for await (const a of it) {} };
const h = async (it: any) => { for await (const a of it) {} };
declare const a: any, b: any;
const c = { ...a, ...b, ...{ g: true, h: 1 } };
const e = { ...{ g: 1 } };
