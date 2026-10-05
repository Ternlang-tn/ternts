"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
async function main() {
    const { readFile } = await import("fs");
    const m = await import(`./x${1}.js`);
    return [readFile, m];
}
