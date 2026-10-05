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
let A = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis_1;
    let _instanceExtraInitializers = [];
    let _static_x_decorators;
    let _static_x_initializers = [];
    let _static_x_extraInitializers = [];
    let _m_decorators;
    var A = class {
        static { _classThis_1 = this; }
        static {
            const _metadata_1 = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _m_decorators = [dec];
            _static_x_decorators = [dec];
            __esDecorate(this, null, _m_decorators, { kind: "method", name: "m", static: false, private: false, access: { has: obj => "m" in obj, get: obj => obj.m }, metadata: _metadata_1 }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _static_x_decorators, { kind: "field", name: "x", static: true, private: false, access: { has: obj => "x" in obj, get: obj => obj.x, set: (obj, value) => { obj.x = value; } }, metadata: _metadata_1 }, _static_x_initializers, _static_x_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis_1 }, _classDecorators, { kind: "class", name: _classThis_1.name, metadata: _metadata_1 }, null, _classExtraInitializers);
            A = _classThis_1 = _classDescriptor.value;
            if (_metadata_1) Object.defineProperty(_classThis_1, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata_1 });
        }
        m() { }
        static x = __runInitializers(_classThis_1, _static_x_initializers, 1);
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
        static {
            __runInitializers(_classThis_1, _static_x_extraInitializers);
            __runInitializers(_classThis_1, _classExtraInitializers);
        }
    };
    return A = _classThis_1;
})();
let B = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis_1;
    let _instanceExtraInitializers = [];
    let _m_decorators;
    let _y_decorators;
    let _y_initializers = [];
    let _y_extraInitializers = [];
    var B = class {
        static { _classThis_1 = this; }
        static {
            const _metadata_1 = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _m_decorators = [dec];
            _y_decorators = [dec];
            __esDecorate(this, null, _m_decorators, { kind: "method", name: "m", static: false, private: false, access: { has: obj => "m" in obj, get: obj => obj.m }, metadata: _metadata_1 }, null, _instanceExtraInitializers);
            __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata_1 }, _y_initializers, _y_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis_1 }, _classDecorators, { kind: "class", name: _classThis_1.name, metadata: _metadata_1 }, null, _classExtraInitializers);
            B = _classThis_1 = _classDescriptor.value;
            if (_metadata_1) Object.defineProperty(_classThis_1, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata_1 });
            __runInitializers(_classThis_1, _classExtraInitializers);
        }
        m() { }
        y = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _y_initializers, 2));
        constructor() {
            __runInitializers(this, _y_extraInitializers);
        }
    };
    return B = _classThis_1;
})();
const _metadata = 1;
const _classThis = 2;
function f() { let C = (() => {
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis_1;
    let _instanceExtraInitializers = [];
    let _m_decorators;
    var C = class {
        static { _classThis_1 = this; }
        static {
            const _metadata_1 = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _m_decorators = [dec];
            __esDecorate(this, null, _m_decorators, { kind: "method", name: "m", static: false, private: false, access: { has: obj => "m" in obj, get: obj => obj.m }, metadata: _metadata_1 }, null, _instanceExtraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis_1 }, _classDecorators, { kind: "class", name: _classThis_1.name, metadata: _metadata_1 }, null, _classExtraInitializers);
            C = _classThis_1 = _classDescriptor.value;
            if (_metadata_1) Object.defineProperty(_classThis_1, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata_1 });
            __runInitializers(_classThis_1, _classExtraInitializers);
        }
        m() { }
        constructor() {
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
    return C = _classThis_1;
})(); return C; }
