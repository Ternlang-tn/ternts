function dec(...args: any[]): any {}
// exported by a list after the declaration: the export must see the decorated class
@dec
class Referenced { static self = Referenced; create() { return new Referenced(); } }
@dec
class Plain { m() {} }
export { Referenced, Plain as Renamed };
