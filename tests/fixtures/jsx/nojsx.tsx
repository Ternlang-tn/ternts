// a .tsx file with no imports or exports is still a module only if it has JSX
const x = <T,>(a: T) => a;
let y = x(1) as number;
