"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.other = exports.file = exports.dir = exports.here = void 0;
exports.here = require("url").pathToFileURL(__filename).toString();
exports.dir = __dirname;
exports.file = __filename;
exports.other = import.meta.env;
