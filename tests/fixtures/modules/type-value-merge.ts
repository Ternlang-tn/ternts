// a type and a variable of the same name: its exports are of the variable
type Foo = number;
export const Foo = 1;
interface Bar {}
const Bar = {};
export { Bar };
export default Foo;
