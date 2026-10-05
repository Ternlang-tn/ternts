// labelled for await below ES2018 (the label moves onto the loop inside the try); a
// top-level for await (its e_N in the prologue var list)
async function f(y: any) { outer: for await (const x of y) { continue outer; } }
for await (const z of [Promise.resolve(1)]) { z; }
export {};
