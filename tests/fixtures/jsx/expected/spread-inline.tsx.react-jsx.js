import { jsx as _jsx } from "react/jsx-runtime";
export const A = (a, b, c) => _jsx("div", { className: "x", ...a, ...b, ...{ c } });
export const B = (a) => _jsx("div", { ...{ __proto__: null, dir: "rtl" }, ...a });
export const C = (p) => _jsx("div", { [p]: 1 });
