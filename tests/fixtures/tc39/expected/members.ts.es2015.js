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
var __classPrivateFieldIn = (this && this.__classPrivateFieldIn) || function(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
};
let C = (() => {
    var _C_instances, _C_p_get, _C_a_accessor_storage;
    let _classDecorators = [dec];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _static_s_decorators;
    let _static_s_initializers = [];
    let _static_s_extraInitializers = [];
    let _m_decorators;
    let _a_decorators;
    let _a_initializers = [];
    let _a_extraInitializers = [];
    let _private_p_decorators;
    let _private_p_descriptor;
    let _get_g_decorators;
    var C = _classThis = class {
        m() { }
        get a() { return __classPrivateFieldGet(this, _C_a_accessor_storage, "f"); }
        set a(value) { __classPrivateFieldSet(this, _C_a_accessor_storage, value, "f"); }
        get g() { return 1; }
        constructor() {
            _C_instances.add(this);
            _C_a_accessor_storage.set(this, (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _a_initializers, 2)));
            __runInitializers(this, _a_extraInitializers);
        }
    };
    _C_instances = new WeakSet();
    _C_a_accessor_storage = new WeakMap();
    _C_p_get = function _C_p_get() { return _private_p_descriptor.value; };
    __setFunctionName(_classThis, "C");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _m_decorators = [dec];
        _static_s_decorators = [dec];
        _a_decorators = [dec];
        _private_p_decorators = [dec];
        _get_g_decorators = [dec];
        __esDecorate(_classThis, null, _m_decorators, { kind: "method", name: "m", static: false, private: false, access: { has: obj => "m" in obj, get: obj => obj.m }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _a_decorators, { kind: "accessor", name: "a", static: false, private: false, access: { has: obj => "a" in obj, get: obj => obj.a, set: (obj, value) => { obj.a = value; } }, metadata: _metadata }, _a_initializers, _a_extraInitializers);
        __esDecorate(_classThis, _private_p_descriptor = { value: __setFunctionName(function () { }, "#p") }, _private_p_decorators, { kind: "method", name: "#p", static: false, private: true, access: { has: obj => __classPrivateFieldIn(_C_instances, obj), get: obj => __classPrivateFieldGet(obj, _C_instances, "a", _C_p_get) }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_g_decorators, { kind: "getter", name: "g", static: false, private: false, access: { has: obj => "g" in obj, get: obj => obj.g }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _static_s_decorators, { kind: "field", name: "s", static: true, private: false, access: { has: obj => "s" in obj, get: obj => obj.s, set: (obj, value) => { obj.s = value; } }, metadata: _metadata }, _static_s_initializers, _static_s_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        C = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.s = __runInitializers(_classThis, _static_s_initializers, 1);
    (() => {
        __runInitializers(_classThis, _static_s_extraInitializers);
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return C = _classThis;
})();
