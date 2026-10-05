// an unnamed class expression's #private names take the name it's assigned to (_D_x), unless
// tsc's TypeScript pass rewrote the class (annotations, modifiers...) and named evaluation
// doesn't give the name back (no statics): then _x; x?.y over a name stays a name
export const A = class { #x = 1; v = 1; };
export const B = class { #x: number = 1; public v = 1; };
export const C = class { static #s = "s"; #x = true; public v = 1; };
declare const socketModule: any;
if (socketModule?.SocketModule) {}
