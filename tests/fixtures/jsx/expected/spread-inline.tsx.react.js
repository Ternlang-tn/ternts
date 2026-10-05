"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C = exports.B = exports.A = void 0;
const A = (a, b, c) => React.createElement("div", { className: "x", ...a, ...b, ...{ c } });
exports.A = A;
const B = (a) => React.createElement("div", { ...{ __proto__: null, dir: "rtl" }, ...a });
exports.B = B;
const C = (p) => React.createElement("div", { [p]: 1 });
exports.C = C;
