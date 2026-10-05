var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Merged_1;
import { Injectable, Inject, Prop } from "@nestjs/common";
var Local;
(function (Local) {
    Local[Local["A"] = 0] = "A";
    Local[Local["B"] = 1] = "B";
})(Local || (Local = {}));
var LocalS;
(function (LocalS) {
    LocalS["A"] = "a";
})(LocalS || (LocalS = {}));
class LocalClass {
}
const VALUES = ["x", "y"];
let Service = class Service {
    constructor(repo, token, other) {
        this.repo = repo;
    }
    method(a, b) { return null; }
    get value() { return 1; }
    set value(v) { }
    static st(x) { }
    noTypes(a, b) { return a; }
};
__decorate([
    Prop()
], Service.prototype, "s", void 0);
__decorate([
    Prop()
], Service.prototype, "n", void 0);
__decorate([
    Prop()
], Service.prototype, "b", void 0);
__decorate([
    Prop()
], Service.prototype, "big", void 0);
__decorate([
    Prop()
], Service.prototype, "sym", void 0);
__decorate([
    Prop()
], Service.prototype, "arr", void 0);
__decorate([
    Prop()
], Service.prototype, "tuple", void 0);
__decorate([
    Prop()
], Service.prototype, "fn", void 0);
__decorate([
    Prop()
], Service.prototype, "obj", void 0);
__decorate([
    Prop()
], Service.prototype, "any", void 0);
__decorate([
    Prop()
], Service.prototype, "unk", void 0);
__decorate([
    Prop()
], Service.prototype, "nul", void 0);
__decorate([
    Prop()
], Service.prototype, "und", void 0);
__decorate([
    Prop()
], Service.prototype, "lit", void 0);
__decorate([
    Prop()
], Service.prototype, "union", void 0);
__decorate([
    Prop()
], Service.prototype, "mixed", void 0);
__decorate([
    Prop()
], Service.prototype, "en", void 0);
__decorate([
    Prop()
], Service.prototype, "ens", void 0);
__decorate([
    Prop()
], Service.prototype, "iface", void 0);
__decorate([
    Prop()
], Service.prototype, "alias", void 0);
__decorate([
    Prop()
], Service.prototype, "cls", void 0);
__decorate([
    Prop()
], Service.prototype, "imported", void 0);
__decorate([
    Prop()
], Service.prototype, "importedEnum", void 0);
__decorate([
    Prop()
], Service.prototype, "typeOnly", void 0);
__decorate([
    Prop()
], Service.prototype, "nsType", void 0);
__decorate([
    Prop()
], Service.prototype, "promise", void 0);
__decorate([
    Prop()
], Service.prototype, "date", void 0);
__decorate([
    Prop()
], Service.prototype, "map", void 0);
__decorate([
    Prop()
], Service.prototype, "generic", void 0);
__decorate([
    Prop()
], Service.prototype, "elem", void 0);
__decorate([
    Prop()
], Service.prototype, "keyed", void 0);
__decorate([
    Prop()
], Service.prototype, "tmpl", void 0);
__decorate([
    Prop()
], Service.prototype, "never", void 0);
__decorate([
    Prop()
], Service.prototype, "voidish", void 0);
__decorate([
    Prop()
], Service.prototype, "self", void 0);
__decorate([
    Prop()
], Service.prototype, "method", null);
__decorate([
    Prop()
], Service.prototype, "value", null);
__decorate([
    Prop()
], Service.prototype, "noTypes", null);
__decorate([
    Prop()
], Service, "st", null);
Service = __decorate([
    Injectable(),
    __param(1, Inject("TOKEN"))
], Service);
export { Service };
let Merged = Merged_1 = class Merged {
    static of() { return new Merged_1(); }
};
Merged = Merged_1 = __decorate([
    Injectable()
], Merged);
const Merged2 = 1;
export class UsesMerged {
    constructor(m, n) { }
}
export function paramDecorated(x) { }
