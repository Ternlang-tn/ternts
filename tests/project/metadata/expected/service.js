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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const decorators_1 = require("./decorators");
const types_1 = require("./shared/types");
const shared_1 = require("./shared");
const types_2 = require("@app/types");
let Service = class Service {
    constructor(repo2, renamed2, s, m) {
        this.repo2 = repo2;
        this.renamed2 = renamed2;
    }
};
exports.Service = Service;
__decorate([
    (0, decorators_1.Prop)(),
    __metadata("design:type", Object)
], Service.prototype, "shape", void 0);
__decorate([
    (0, decorators_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "name", void 0);
__decorate([
    (0, decorators_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "kind", void 0);
__decorate([
    (0, decorators_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "color", void 0);
__decorate([
    (0, decorators_1.Prop)(),
    __metadata("design:type", Number)
], Service.prototype, "num", void 0);
__decorate([
    (0, decorators_1.Prop)(),
    __metadata("design:type", types_1.Repo)
], Service.prototype, "repo", void 0);
__decorate([
    (0, decorators_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "mode", void 0);
__decorate([
    (0, decorators_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "level", void 0);
__decorate([
    (0, decorators_1.Prop)(),
    __metadata("design:type", Function)
], Service.prototype, "fn", void 0);
__decorate([
    (0, decorators_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "maybe", void 0);
__decorate([
    (0, decorators_1.Prop)(),
    __metadata("design:type", BigInt)
], Service.prototype, "big", void 0);
__decorate([
    (0, decorators_1.Prop)(),
    __metadata("design:type", shared_1.RenamedRepo)
], Service.prototype, "renamed", void 0);
__decorate([
    (0, decorators_1.Prop)(),
    __metadata("design:type", String)
], Service.prototype, "aliased", void 0);
__decorate([
    (0, decorators_1.Prop)(),
    __metadata("design:type", Function)
], Service.prototype, "typeOnly", void 0);
exports.Service = Service = __decorate([
    (0, decorators_1.Injectable)(),
    __metadata("design:paramtypes", [types_1.Repo, shared_1.RenamedRepo, Object, String])
], Service);
