var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const _super = { x: () => "mine" };
class A {
    x() { return "a"; }
}
class B extends A {
    m() {
        const _superIndex = name => super[name];
        const _super_1 = Object.create(null, {
            x: { get: () => super.x }
        });
        return __awaiter(this, void 0, void 0, function* () { const own = _super.x(); return _super_1.x.call(this) + _superIndex("x").call(this) + own; });
    }
    n() {
        const _super_1 = Object.create(null, {
            x: { get: () => super.x }
        });
        return __awaiter(this, void 0, void 0, function* () { return _super_1.x.call(this); });
    }
}
