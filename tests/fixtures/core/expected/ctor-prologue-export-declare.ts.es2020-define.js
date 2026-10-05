"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Foo2 {
    constructor(A, B) {
        "ngInject1";
        "ngInject2";
        Object.defineProperty(this, "A", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: A
        });
        Object.defineProperty(this, "B", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: B
        });
        console.log(1);
    }
}
exports.a.__foo;
var N;
(function (N) {
    N.r = N.q + 1;
})(N || (N = {}));
