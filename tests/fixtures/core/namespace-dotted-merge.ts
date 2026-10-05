// A.B.C sees what A.B exports from its other blocks (through B); a dotted namespace inside
// another declares its inner parts with let (at the top level, var)
module A.B {
    export class EventManager { }
}
module A.B.C {
    export class ContextMenu extends EventManager { }
}
module X { export module my.buz { export var q = 1; } }
