// using at the top level, then legacy-decorated classes (hoisted, decorated in the block)
declare var dec: any;
using before = null;
@dec
class A {}
@dec
export class B {}
