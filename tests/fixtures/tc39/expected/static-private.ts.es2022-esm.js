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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __classPrivateFieldIn = (this && this.__classPrivateFieldIn) || function(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
let C = (() => {
    var _C_m_get, _C_g_get, _C_f;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _staticExtraInitializers = [];
    let _static_private_m_decorators;
    let _static_private_m_descriptor;
    let _static_private_get_g_decorators;
    let _static_private_get_g_descriptor;
    let _static_private_f_decorators;
    let _static_private_f_initializers = [];
    let _static_private_f_extraInitializers = [];
    var C = class {
        static { _classThis = this; }
        static { __setFunctionName(this, "C"); }
        static { _C_m_get = function _C_m_get() { return _static_private_m_descriptor.value; }, _C_g_get = function _C_g_get() { return _static_private_get_g_descriptor.get.call(this); }; }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _static_private_m_decorators = [dec];
            _static_private_get_g_decorators = [dec];
            _static_private_f_decorators = [dec];
            __esDecorate(this, _static_private_m_descriptor = { value: __setFunctionName(function () { }, "#m") }, _static_private_m_decorators, { kind: "method", name: "#m", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "a", _C_m_get) }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(this, _static_private_get_g_descriptor = { get: __setFunctionName(function () { return 1; }, "#g", "get") }, _static_private_get_g_decorators, { kind: "getter", name: "#g", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "a", _C_g_get) }, metadata: _metadata }, null, _staticExtraInitializers);
            __esDecorate(null, null, _static_private_f_decorators, { kind: "field", name: "#f", static: true, private: true, access: { has: obj => __classPrivateFieldIn(_classThis, obj), get: obj => __classPrivateFieldGet(obj, _classThis, "f", _C_f), set: (obj, value) => { __classPrivateFieldSet(obj, _classThis, value, "f", _C_f); } }, metadata: _metadata }, _static_private_f_initializers, _static_private_f_extraInitializers);
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            C = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static {
            _C_f = { value: (__runInitializers(_classThis, _staticExtraInitializers), __runInitializers(_classThis, _static_private_f_initializers, 1)) };
        }
        static m() { return __classPrivateFieldGet(C, _classThis, "a", _C_m_get).call(C); }
        static {
            __runInitializers(_classThis, _static_private_f_extraInitializers);
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return C = _classThis;
})();
let D = (() => {
    var _D_field1;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var D = class {
        static { _classThis = this; }
        static { __setFunctionName(this, "D"); }
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
            D = _classThis = _classDescriptor.value;
            if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        static {
            _D_field1 = { value: 0 };
        }
        static {
            __classPrivateFieldGet(_classThis, _classThis, "f", _D_field1);
            __classPrivateFieldSet(_classThis, _classThis, 1, "f", _D_field1);
        }
        static {
            __runInitializers(_classThis, _classExtraInitializers);
        }
    };
    return D = _classThis;
})();
