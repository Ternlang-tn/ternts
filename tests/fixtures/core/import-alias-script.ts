// import x = A.B (no require) doesn't make the file a module: no exports, no `export {}`
namespace N { export const v = 1; }
import a = N;
var b = a.v;
