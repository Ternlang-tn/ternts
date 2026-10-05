// below ES2020: parameters whose defaults need temps all move into the body, patterns too;
// C_1.s?.() of a decorated class takes a temp (a property access, unlike mod_1.f); a static
// #instances is named after the class's own instances set
declare function d(...a: any[]): any;
class T {
    dimensions: any; container: any;
    lt({ xterm }: any, width = this.dimensions?.width ?? this.container.clientWidth, height = 1) { width -= 10; }
    m2(w = this.dimensions?.b, [y, z]: any, ...r: any[]) {}
}
@d class F {
    static s: any;
    m(x: any) { return F.s?.(x); }
}
class W {
    static #instances = new Set<W>();
    #m() {}
    go() { W.#instances.add(this); this.#m(); }
}
