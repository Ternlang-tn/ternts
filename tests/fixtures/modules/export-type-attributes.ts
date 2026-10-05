// import attributes after `export type ... from`
export type { A } from "pkg" assert { "resolution-mode": "require" };
export type { B } from "pkg" with { "resolution-mode": "import" };
export type * from "pkg" with { "resolution-mode": "import" };
export type * as N from "pkg" with { "resolution-mode": "import" };
export const x = 1;
