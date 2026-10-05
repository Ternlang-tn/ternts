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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __propKey = (this && this.__propKey) || function (x) {
    return typeof x === "symbol" ? x : "".concat(x);
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
const field3 = "field3";
let C = (() => {
    var _a, _C_field1_accessor_storage, _C__a_accessor_storage, _C__b_accessor_storage;
    var _b;
    let _field1_decorators;
    let _field1_initializers = [];
    let _field1_extraInitializers = [];
    let _member_decorators;
    let _member_initializers = [];
    let _member_extraInitializers = [];
    let _member_decorators_1;
    let _member_initializers_1 = [];
    let _member_extraInitializers_1 = [];
    return _a = class C {
            get field1() { return __classPrivateFieldGet(this, _C_field1_accessor_storage, "f"); }
            set field1(value) { __classPrivateFieldSet(this, _C_field1_accessor_storage, value, "f"); }
            get [(_C_field1_accessor_storage = new WeakMap(), _C__a_accessor_storage = new WeakMap(), _C__b_accessor_storage = new WeakMap(), "field2")]() { return __classPrivateFieldGet(this, _C__a_accessor_storage, "f"); }
            set ["field2"](value) { __classPrivateFieldSet(this, _C__a_accessor_storage, value, "f"); }
            get [(_field1_decorators = [dec(1)], _member_decorators = [dec(2)], _member_decorators_1 = [dec(3)], _b = __propKey(field3))]() { return __classPrivateFieldGet(this, _C__b_accessor_storage, "f"); }
            set [_b](value) { __classPrivateFieldSet(this, _C__b_accessor_storage, value, "f"); }
            constructor() {
                _C_field1_accessor_storage.set(this, __runInitializers(this, _field1_initializers, 1));
                _C__a_accessor_storage.set(this, (__runInitializers(this, _field1_extraInitializers), __runInitializers(this, _member_initializers, 2)));
                _C__b_accessor_storage.set(this, (__runInitializers(this, _member_extraInitializers), __runInitializers(this, _member_initializers_1, 3)));
                __runInitializers(this, _member_extraInitializers_1);
            }
        },
        (() => {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            __esDecorate(_a, null, _field1_decorators, { kind: "accessor", name: "field1", static: false, private: false, access: { has: obj => "field1" in obj, get: obj => obj.field1, set: (obj, value) => { obj.field1 = value; } }, metadata: _metadata }, _field1_initializers, _field1_extraInitializers);
            __esDecorate(_a, null, _member_decorators, { kind: "accessor", name: "field2", static: false, private: false, access: { has: obj => "field2" in obj, get: obj => obj["field2"], set: (obj, value) => { obj["field2"] = value; } }, metadata: _metadata }, _member_initializers, _member_extraInitializers);
            __esDecorate(_a, null, _member_decorators_1, { kind: "accessor", name: _b, static: false, private: false, access: { has: obj => _b in obj, get: obj => obj[_b], set: (obj, value) => { obj[_b] = value; } }, metadata: _metadata }, _member_initializers_1, _member_extraInitializers_1);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
})();
