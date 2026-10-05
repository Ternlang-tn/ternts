// in a script, a top-level import alias of a value (or of a name not in the file) is kept
// even when unused; one of types only is not
module Outer {
    export module inst { export class C { } }
    export module uninst { export interface P { } }
}
import a = Outer.inst;
import b = Outer.uninst;
import c = Missing.Thing;
interface I { }
import d = I;
