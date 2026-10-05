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
    lt(_b, width, height) { var _c, _d; var { xterm } = _b; if (width === void 0) { width = (_d = (_c = this.dimensions) === null || _c === void 0 ? void 0 : _c.width) !== null && _d !== void 0 ? _d : this.container.clientWidth; } if (height === void 0) { height = 1; } width -= 10; }
    m2(w, _b, ...r) { var _c; if (w === void 0) { w = (_c = this.dimensions) === null || _c === void 0 ? void 0 : _c.b; } var [y, z] = _b; }
}
let F = F_1 = class F {
    m(x) { var _b; return (_b = F_1.s) === null || _b === void 0 ? void 0 : _b.call(F_1, x); }
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
