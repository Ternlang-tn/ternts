import type { Foo } from "./foo";
import { type Bar, baz } from "./bar";
import Unused, { alsoUnused } from "./unused";
import * as ns from "./ns";
import def from "./def";
type T1 = { a: string } & Partial<Record<string, number>>;
interface I1 extends Foo { b?: Bar }
declare const g: unique symbol;
declare function decl(x: number): void;
declare global { interface Window { x: number } }
export type { Foo };
export type Re = Bar;
let v = <any>baz;
let w = baz as unknown as string[];
let s = { a: 1 } satisfies Record<string, number>;
let n = v!.thing!;
const fn = <T,>(x: T): x is T => true;
function assertIs(x: unknown): asserts x is string {}
export const out = [v, w, s, n, fn, ns.value, def, assertIs];
export function opt(this: Window, a?: number, ...rest: string[]): void {}
abstract class A { abstract m(): void; }
let tpl: `a${string}` = `a${1}`;
let tup: [a: number, b?: string, ...c: boolean[]] = [1];
