// module preserve: no `export {}` is added (with verbatimModuleSyntax a written one stays)
import type { T } from "./t";
export {};
const a: T = 1;
