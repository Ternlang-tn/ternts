// an import read only by an alias that goes (import f = foo.M1, f used in types only) goes
// too, as tsc; an alias that's used, or exported by a list, keeps it
import foo = require("./m");
import f = foo.M1;
var i: f.I2;
import { A } from "./a";
import B = A.C;
export { B };
import bar = require("./b");
import g = bar.G;
console.log(g);
