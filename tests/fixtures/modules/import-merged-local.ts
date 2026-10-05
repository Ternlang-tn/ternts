// an import whose name a top-level value declaration also declares is a type merged with
// it: references and export lists go to the local, and the import goes
import { A, B, C, E, N } from "./b";
console.log(A, E);
class A {}
const B = 1;
function C() {}
enum E { x }
namespace N { export const y = 1; }
export { A, B, C, E, N };
