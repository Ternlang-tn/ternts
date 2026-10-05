// a namespace that declares a variable is instantiated even when nothing of it is written
module M { export var n: number; }
namespace Types { export interface I {} export type T = 1; declare var d: number; }
namespace Ambient { declare const c: number; export declare let e: string; }
var x = M.n;
// ambient values instantiate it too (declare class/enum, a declare namespace holding a value);
// an alias, a `declare global` or an empty statement-less declare module does not
namespace N2 { declare class C {} }
namespace N4 { export declare const enum E { a } }
namespace N5 { declare namespace Q { var y: number } }
namespace N6 { declare module Q2 { interface I {} } }
namespace N7 { import a = M; export type T = 1; }
namespace N9 { declare global { } }
namespace N10 { ; }
