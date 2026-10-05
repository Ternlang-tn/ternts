export const A = (a, b, c) => <div className="x" {...{ ...a, ...b, ...{ c } }}/>;
export const B = (a) => <div {...{ __proto__: null, dir: "rtl" }} {...a}/>;
export const C = (p) => <div {...{ [p]: 1 }}/>;
