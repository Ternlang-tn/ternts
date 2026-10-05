// a name exported by a list, declared by merging declarations
enum Merged { A = 1 }
enum Merged { B = 2 }
function f() {}
namespace f { export const meta = 1; }
namespace Space { export const a = 1; }
namespace Space { export const b = 2; }
export { Merged, f, Space };
