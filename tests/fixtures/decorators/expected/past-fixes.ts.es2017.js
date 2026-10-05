"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var SelfRef_1;
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Minified = exports.UsesIndexed = exports.Rest = exports.Computed = exports.SelfRef = void 0;
exports.factory = factory;
const common_1 = require("@nestjs/common");
const keys_1 = require("./keys");
let SelfRef = SelfRef_1 = class SelfRef {
    constructor() {
        this.p = { v: SelfRef_1 };
    }
    static make() { return new SelfRef_1(); }
};
exports.SelfRef = SelfRef;
exports.SelfRef = SelfRef = SelfRef_1 = __decorate([
    (0, common_1.Injectable)()
], SelfRef);
let n = 0;
class Computed {
}
exports.Computed = Computed;
_a = `k${n++}`;
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", String)
], Computed.prototype, _a, void 0);
class Rest {
    m(...xs) { }
    s(...xs) { }
    constructor(...args) { }
}
exports.Rest = Rest;
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], Rest.prototype, "m", null);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Rest.prototype, "s", null);
class UsesIndexed {
}
exports.UsesIndexed = UsesIndexed;
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", typeof (_b = typeof Indexed !== "undefined" && Indexed) === "function" ? _b : Object)
], UsesIndexed.prototype, "i", void 0);
function factory() {
    class Inner {
    }
    __decorate([
        (0, common_1.Prop)(),
        __metadata("design:type", Object)
    ], Inner.prototype, "t", void 0);
    return Inner;
}
class Base {
    constructor(..._) { }
}
class Minified extends Base {
    constructor(y) {
        this.y = y;
        this.x = 1;
        super(), this.extra();
    }
    extra() { }
}
exports.Minified = Minified;
