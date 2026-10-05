// an import merged with a local type may still be a value: its re-exports stay
import { A } from "./a";
type A = 0;
import { B } from "./b";
interface B {}
export { A, B as C };
export default B;
