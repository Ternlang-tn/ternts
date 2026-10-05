// nested for awaits hoist the outer loop's names first; a parameter named _ is copied as _1
export async function getEntries(dir = process.cwd()) {
    for await (const a of g(dir)) { for await (const b of g(a)) { console.log(b); } }
}
const f = async (_: any, { a }: any) => a;
declare function g(x: any): any;
