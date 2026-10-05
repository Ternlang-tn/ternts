import def, * as all from "./a";
import { x as y } from "./b";
import json from "./data.json";
export { y };
export * from "./c";
export * as cns from "./d";
export { z as zz } from "./e";
export const value = [def, all, json, fs.readFileSync];
export let mutable = 1;
mutable++;
export function hoisted() { return mutable; }
export class K {
}
const later = 2;
export { later as renamed };
const dyn = import("./dynamic");
export async function lazy() { return (await import("./lazy")).thing; }
