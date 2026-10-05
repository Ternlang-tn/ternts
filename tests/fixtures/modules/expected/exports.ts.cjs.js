"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renamed = exports.K = exports.mutable = exports.value = exports.zz = exports.cns = exports.y = void 0;
exports.hoisted = hoisted;
exports.lazy = lazy;
const a_1 = require("./a"), all = a_1;
const b_1 = require("./b");
Object.defineProperty(exports, "y", { enumerable: true, get: function () { return b_1.x; } });
const data_json_1 = require("./data.json");
const fs = require("fs");
__exportStar(require("./c"), exports);
exports.cns = require("./d");
var e_1 = require("./e");
Object.defineProperty(exports, "zz", { enumerable: true, get: function () { return e_1.z; } });
exports.value = [a_1.default, all, data_json_1.default, fs.readFileSync];
exports.mutable = 1;
exports.mutable++;
function hoisted() { return exports.mutable; }
class K {
}
exports.K = K;
const later = 2;
exports.renamed = later;
const dyn = Promise.resolve().then(() => require("./dynamic"));
async function lazy() { return (await Promise.resolve().then(() => require("./lazy"))).thing; }
