export namespace Geo {
  export const PI = 3.14;
  export function area(r: number) { return PI * r * r; }
  export namespace Inner { export let depth = 2; }
  export interface Shape { kind: string }
  export type Alias = number;
}
declare namespace Types { const t: number; }
module Legacy { export var y = Geo.area(2); }
export import Area = Geo.area;
