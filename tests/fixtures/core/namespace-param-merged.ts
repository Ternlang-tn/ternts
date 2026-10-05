// the renamed IIFE parameter is unique in the file across merged blocks (numbered on), and a
// parameter property binds the name too
module M {
    export var x = 3;
    class c { constructor(M, p = x) {} }
}
module M {
    class d { constructor(private M, p = x) {} }
}
module M {
    function fn3() { function M() { var p = x; } }
}
