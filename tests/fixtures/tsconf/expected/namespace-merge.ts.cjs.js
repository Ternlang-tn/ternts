var my;
(function (my) {
    var data;
    (function (data) {
        var foo;
        (function (foo) {
            function buz() { return 1; }
            foo.buz = buz;
            foo.count = 0;
        })(foo = data.foo || (data.foo = {}));
    })(data = my.data || (my.data = {}));
})(my || (my = {}));
(function (my_1) {
    var data;
    (function (data_1) {
        function data(my) {
            data_1.foo.buz();
            return my;
        }
    })(data = my_1.data || (my_1.data = {}));
})(my || (my = {}));
var A;
(function (A_1) {
    class A {
    }
    A_1.A = A;
})(A || (A = {}));
var B;
(function (B_1) {
    const f = (B) => B;
    B_1.g = f;
})(B || (B = {}));
var C;
(function (C) {
    C.z = 1;
})(C || (C = {}));
var D;
(function (D) {
    D.w = 2;
})(D || (D = {}));
var Range;
(function (Range) {
    Range.from = (r) => r;
    Range.g = () => null;
})(Range || (Range = {}));
