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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var Merged_1;
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsesMerged = exports.Service = void 0;
exports.paramDecorated = paramDecorated;
const common_1 = require("@nestjs/common");
const repo_1 = require("./repo");
const models = require("./models");
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
    static st(x) { }
    noTypes(a, b) { return a; }
};
exports.Service = Service;
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "s", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Number)
], Service.prototype, "n", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Boolean)
], Service.prototype, "b", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], Service.prototype, "big", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Symbol)
], Service.prototype, "sym", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Array)
], Service.prototype, "arr", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Array)
], Service.prototype, "tuple", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Function)
], Service.prototype, "fn", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Object)
], Service.prototype, "obj", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Object)
], Service.prototype, "any", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Object)
], Service.prototype, "unk", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "nul", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Number)
], Service.prototype, "und", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "lit", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "union", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Object)
], Service.prototype, "mixed", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Number)
], Service.prototype, "en", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "ens", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Object)
], Service.prototype, "iface", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "alias", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", LocalClass)
], Service.prototype, "cls", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", typeof (_b = typeof repo_1.Repo !== "undefined" && repo_1.Repo) === "function" ? _b : Object)
], Service.prototype, "imported", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", typeof (_c = typeof repo_1.Kind !== "undefined" && repo_1.Kind) === "function" ? _c : Object)
], Service.prototype, "importedEnum", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Object)
], Service.prototype, "typeOnly", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", typeof (_d = typeof models !== "undefined" && models.User) === "function" ? _d : Object)
], Service.prototype, "nsType", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], Service.prototype, "promise", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], Service.prototype, "date", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", typeof (_g = typeof Map !== "undefined" && Map) === "function" ? _g : Object)
], Service.prototype, "map", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Object)
], Service.prototype, "generic", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Object)
], Service.prototype, "elem", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Object)
], Service.prototype, "keyed", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "tmpl", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", void 0)
], Service.prototype, "never", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", void 0)
], Service.prototype, "voidish", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Service)
], Service.prototype, "self", void 0);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_h = typeof repo_1.Repo !== "undefined" && repo_1.Repo) === "function" ? _h : Object]),
    __metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], Service.prototype, "method", null);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], Service.prototype, "noTypes", null);
__decorate([
    (0, common_1.Prop)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], Service, "st", null);
exports.Service = Service = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)("TOKEN")),
    __metadata("design:paramtypes", [typeof (_a = typeof repo_1.Repo !== "undefined" && repo_1.Repo) === "function" ? _a : Object, String, LocalClass])
], Service);
let Merged = Merged_1 = class Merged {
    static of() { return new Merged_1(); }
};
Merged = Merged_1 = __decorate([
    (0, common_1.Injectable)()
], Merged);
const Merged2 = 1;
class UsesMerged {
    constructor(m, n) { }
}
exports.UsesMerged = UsesMerged;
function paramDecorated(x) { }
