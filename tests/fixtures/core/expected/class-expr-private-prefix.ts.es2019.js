"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _A_x, _a, _x, _b, _c, _C_s, _C_x;
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = exports.B = exports.A = void 0;
exports.A = (_a = class {
        constructor() {
            _A_x.set(this, 1);
            this.v = 1;
        }
    },
    _A_x = new WeakMap(),
    _a);
exports.B = (_b = class {
        constructor() {
            _x.set(this, 1);
            this.v = 1;
        }
    },
    _x = new WeakMap(),
    _b);
exports.C = (_c = class {
        constructor() {
            _C_x.set(this, true);
            this.v = 1;
        }
    },
    _C_x = new WeakMap(),
    __setFunctionName(_c, "C"),
    _C_s = { value: "s" },
    _c);
if (socketModule === null || socketModule === void 0 ? void 0 : socketModule.SocketModule) { }
