var Q;
(function (Q) {
    Q[Q["A"] = 1] = "A";
    Q[Q["B"] = 0] = "B";
    Q[Q["C"] = 3] = "C";
    Q[Q["D"] = 0] = "D";
    Q[Q["E"] = 5] = "E";
    Q[Q["F"] = Q.F] = "F";
})(Q || (Q = {}));
var Foo;
(function (Foo) {
    Foo["A"] = `${BAR}`;
    Foo["C"] = (`${BAR}`);
    Foo[Foo["G"] = 2 + BAR.length] = "G";
    Foo["H"] = Foo.A;
    Foo["I"] = Foo.H + BAR;
    Foo["J"] = Foo.H;
})(Foo || (Foo = {}));
