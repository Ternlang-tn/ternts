import { A } from "./a";
const B = require("./b");
const used = require("./c");
const reexported = require("./e");
export { reexported };
used.x;
export { A, B };
