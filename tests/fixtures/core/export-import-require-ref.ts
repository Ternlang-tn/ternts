// an exported import alias is read through exports; one of an interface is dropped
export import a = require("./m");
var y = a.x;
export import b = a;
export module t { export interface I {} }
export import c = t.I;
const f = a => <any><any>{};
