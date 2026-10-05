// namespaced JSX names, with whitespace around the ':' too (written without, as tsc does)
declare var React: any;
const a = <svg><use xlink:href="#x" xmlns:xlink="y" /></svg>;
const b = <svg:path a:b={1}></svg:path>;
const c = <svg : path a:b={1}></svg : path>;
