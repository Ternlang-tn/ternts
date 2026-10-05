// a named class expression with static #private members reads its own name through its temp
// (as a declaration does); o!.m?.() takes a temp for o
declare const g: any, tool: any, app: any;
g.R = class R { static #e = 1; static x = 2; m() { return [R.#e, R.x, R]; } };
tool!.onDrop?.(app);
