var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var F_1;
class T {
    dimensions;
    container;
    lt({ xterm }, width = this.dimensions?.width ?? this.container.clientWidth, height = 1) { width -= 10; }
    m2(w = this.dimensions?.b, [y, z], ...r) { }
}
let F = class F {
    static { F_1 = this; }
    static s;
    m(x) { return F_1.s?.(x); }
};
F = F_1 = __decorate([
    d
], F);
class W {
    static #instances = new Set();
    #m() { }
    go() { W.#instances.add(this); this.#m(); }
}
