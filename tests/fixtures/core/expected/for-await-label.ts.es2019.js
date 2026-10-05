"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function f(y) { outer: for await (const x of y) {
    continue outer;
} }
for await (const z of [Promise.resolve(1)]) {
    z;
}
