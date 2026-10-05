"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntries = getEntries;
async function getEntries(dir = process.cwd()) {
    for await (const a of g(dir)) {
        for await (const b of g(a)) {
            console.log(b);
        }
    }
}
const f = async (_, { a }) => a;
