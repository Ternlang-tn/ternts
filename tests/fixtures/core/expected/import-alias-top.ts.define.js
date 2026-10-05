var Outer;
(function (Outer) {
    let inst;
    (function (inst) {
        class C {
        }
        inst.C = C;
    })(inst = Outer.inst || (Outer.inst = {}));
})(Outer || (Outer = {}));
var a = Outer.inst;
var c = Missing.Thing;
var d = I;
