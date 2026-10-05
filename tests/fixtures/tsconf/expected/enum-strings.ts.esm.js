var A;
(function (A) {
    A["a"] = `${foo}`;
    A["b"] = "a" + x;
    A["c"] = x + `t${foo}`;
    A[A["d"] = foo + 1] = "d";
    A[A["e"] = x] = "e";
    A["f"] = ("q") + x;
})(A || (A = {}));
let z = 1;
