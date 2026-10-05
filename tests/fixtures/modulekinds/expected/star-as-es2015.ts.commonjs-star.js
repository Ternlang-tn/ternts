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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports["v-v"] = exports["k-k"] = exports["g-h"] = exports.cd = exports["a-b"] = exports.default = exports.ns = void 0;
exports["f-f"] = f;
exports.ns = __importStar(require("./a"));
exports.default = __importStar(require("./b"));
exports["a-b"] = __importStar(require("./c"));
var d_1 = require("./d");
Object.defineProperty(exports, "cd", { enumerable: true, get: function () { return d_1["c-d"]; } });
Object.defineProperty(exports, "g-h", { enumerable: true, get: function () { return d_1["e-f"]; } });
function f() { }
class K {
}
exports["k-k"] = K;
let v = 1;
exports["v-v"] = v;
exports["v-v"] = v = 2;
