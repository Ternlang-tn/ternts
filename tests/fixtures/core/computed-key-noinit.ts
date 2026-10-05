// computed keys without initializers are still evaluated in class order (no temp); declared
// and abstract ones aren't; a decorated method's literal key is used as it is
declare function dec(...a: any[]): any;
class C {
    [a()]: number;
    declare [b()]: number;
    [c()] = 1;
    [d()]: number;
    [e()]() {}
    [Symbol.iterator]: number;
}
abstract class D {
    abstract [g()]: number;
    [h()]?: number;
}
class E {
    @dec ["method"]() {}
}
export const SYM = Symbol();
class Z { private readonly [SYM]: string; #p = 1; [k2()] = 2; }
