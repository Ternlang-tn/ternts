var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class A {
    m(x) { return 1; }
    get g() { return 2; }
    set s(v) { }
    static st() { return 3; }
}
class B extends A {
    run() {
        const _super = Object.create(null, {
            m: { get: () => super.m },
            g: { get: () => super.g }
        });
        const f = () => __awaiter(this, void 0, void 0, function* () { return _super.m.call(this) + _super.g; });
        const g = () => __awaiter(this, void 0, void 0, function* () { const h = () => __awaiter(this, void 0, void 0, function* () { return _super.m.call(this, 1); }); return h(); });
        return [f, g];
    }
    both() {
        const _super = Object.create(null, {
            m: { get: () => super.m },
            g: { get: () => super.g }
        });
        return __awaiter(this, void 0, void 0, function* () { const k = () => __awaiter(this, void 0, void 0, function* () { return _super.m.call(this); }); return _super.g + (yield k()); });
    }
    assign() { const _super = Object.create(null, {
        s: { get: () => super.s, set: v => super.s = v }
    }); const f = () => __awaiter(this, void 0, void 0, function* () { _super.s = 5; }); return f; }
    static stat() { const _super = Object.create(null, {
        st: { get: () => super.st }
    }); return () => __awaiter(this, void 0, void 0, function* () { return _super.st.call(this); }); }
    plain() { return super.m(); }
}
const o = { __proto__: { z() { return 1; } }, y() { const _super = Object.create(null, {
        z: { get: () => super.z }
    }); return () => __awaiter(this, void 0, void 0, function* () { return _super.z.call(this); }); } };
