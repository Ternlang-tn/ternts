// module preserve: import = require stays a require (when used), export import too
import { A } from "./a";
import B = require("./b");
import used = require("./c");
import unused = require("./d");
export import reexported = require("./e");
used.x;
export { A, B };
