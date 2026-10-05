// import = require in an ES module file under node16+: through createRequire (__require, renamed
// when the file has one); an unused one goes; `export import` exports the const
import used = require("./a");
import unused = require("./b");
export import again = require("./c");
const __require = 1;
used(__require);
