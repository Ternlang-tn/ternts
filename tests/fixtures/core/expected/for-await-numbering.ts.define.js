"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function f(xs, y = 1) { for await (const a of xs) { } for await (const b of xs) { } }
test("x", async () => { for await (const a of ys) { } });
test("y", async () => { for await (const a of ys) { } });
