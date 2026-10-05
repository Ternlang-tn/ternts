"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __propKey = (this && this.__propKey) || function (x) {
    return typeof x === "symbol" ? x : "".concat(x);
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.E = void 0;
let A = (() => {
    var _a;
    var _b, _c, _d;
    let _outerThis = this;
    let _instanceExtraInitializers = [];
    let _member_decorators;
    let _member_decorators_1;
    let _member_initializers = [];
    let _member_extraInitializers = [];
    let _m2_decorators;
    let _m3_decorators;
    let _m4_decorators;
    return _a = class A {
            [(_member_decorators = [dec], _b = __propKey(k))]() { }
            [(_member_decorators_1 = [dec], k + 1)]() { }
            m2() { }
            m3() { }
            m4() { }
            constructor() {
                this["lit"] = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _member_initializers, 1));
                __runInitializers(this, _member_extraInitializers);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _m2_decorators = [(_c = ns.a).b.bind(_c)];
            _m3_decorators = [((_d = ns).c.bind(_d))];
            _m4_decorators = [dec(_outerThis)];
            __esDecorate(_a, null, _member_decorators, { kind: "method", name: _b, static: false, private: false, access: { has: obj => _b in obj, get: obj => obj[_b] }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _m2_decorators, { kind: "method", name: "m2", static: false, private: false, access: { has: obj => "m2" in obj, get: obj => obj.m2 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _m3_decorators, { kind: "method", name: "m3", static: false, private: false, access: { has: obj => "m3" in obj, get: obj => obj.m3 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(_a, null, _m4_decorators, { kind: "method", name: "m4", static: false, private: false, access: { has: obj => "m4" in obj, get: obj => obj.m4 }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _member_decorators_1, { kind: "field", name: "lit", static: false, private: false, access: { has: obj => "lit" in obj, get: obj => obj["lit"], set: (obj, value) => { obj["lit"] = value; } }, metadata: _metadata }, _member_initializers, _member_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
const x = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var class_1 = _classThis = class {
    };
    __setFunctionName(_classThis, "x");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        class_1 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return class_1 = _classThis;
})();
exports.default = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var default_1 = _classThis = class {
    };
    __setFunctionName(_classThis, "default");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        default_1 = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return default_1 = _classThis;
})();
let E = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = (0, (class {
    }));
    var E = _classThis = class extends _classSuper {
    };
    __setFunctionName(_classThis, "E");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        E = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return E = _classThis;
})();
exports.E = E;
