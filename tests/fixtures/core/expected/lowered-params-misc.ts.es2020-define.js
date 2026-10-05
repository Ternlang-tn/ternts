var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _W_instances, _a, _W_instances_1, _W_m;
var F_1;
class T {
    constructor() {
        Object.defineProperty(this, "dimensions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "container", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    lt({ xterm }, width = this.dimensions?.width ?? this.container.clientWidth, height = 1) { width -= 10; }
    m2(w = this.dimensions?.b, [y, z], ...r) { }
}
let F = F_1 = class F {
    m(x) { return F_1.s?.(x); }
};
F = F_1 = __decorate([
    d
], F);
class W {
    constructor() {
        _W_instances.add(this);
    }
    go() { __classPrivateFieldGet(_a, _a, "f", _W_instances_1).add(this); __classPrivateFieldGet(this, _W_instances, "m", _W_m).call(this); }
}
_a = W, _W_instances = new WeakSet(), _W_m = function _W_m() { };
_W_instances_1 = { value: new Set() };
