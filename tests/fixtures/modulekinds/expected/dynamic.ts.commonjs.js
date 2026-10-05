"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
async function main() {
    const { readFile } = await Promise.resolve().then(() => require("fs"));
    const m = await Promise.resolve(`${`./x${1}.js`}`).then(s => require(s));
    return [readFile, m];
}
