"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipe = void 0;
exports.later = later;
const common_1 = require("@nestjs/common");
let Pipe = class extends common_1.ValidationPipe {
    run() { return common_1.ValidationPipe; }
};
exports.Pipe = Pipe;
function later() { const Base = 1; return Base; }
