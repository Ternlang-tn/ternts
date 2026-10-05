// enums and namespaces exported by lists, aliases, and merged declarations
namespace Space { export const a = 1; }
export { Space as S1, Space as S2 };
export enum Color { Red }
enum Color { Blue = 5 }
enum Solo { X }
namespace Inner { namespace Deep { export const z = 1; } export const w = 2; }
export { Solo };
namespace NotExported { export const q = 1; }
export namespace Outer { export namespace Mid { export const m = 1; } }
