export const A = (a, b, c) => h("div", { className: "x", ...a, ...b, ...{ c } });
export const B = (a) => h("div", { ...{ __proto__: null, dir: "rtl" }, ...a });
export const C = (p) => h("div", { [p]: 1 });
