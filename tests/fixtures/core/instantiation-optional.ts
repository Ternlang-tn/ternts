// an instantiation expression (f<T> without a call) isn't a name to tsc: ?. and ?? take a temp
declare let a: any;
(a<string>)?.();
a<string>?.();
const x = (a<string>) ?? 1;
