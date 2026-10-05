declare const React: any;
export const A = (a: any, b: any, c: any) => <div className="x" {...{ ...a, ...b, ...{ c } }} />;
export const B = (a: any) => <div {...{ __proto__: null, dir: "rtl" }} {...a} />;
export const C = (p: any) => <div {...{ [p]: 1 }} />;
