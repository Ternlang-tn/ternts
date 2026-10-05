// `@dec export class` / `@dec export default class` (decorators before export) stay exports;
// an anonymous default class tsc names first (a decorated member, an initialized static) is
// `let default_1 = ...; export default default_1`, else `export default (() => ...)()`
declare let dec: any;
@dec export class C {}
