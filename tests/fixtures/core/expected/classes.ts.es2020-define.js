"use strict";
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
var _Base_instances, _Base_secret, _Base_priv, _a, _Accessors_size_accessor_storage, _Accessors_total_accessor_storage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.anon = exports.Derived = exports.Base = void 0;
class Base {
    constructor(name, id, tag = "t") {
        _Base_instances.add(this);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: name
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: id
        });
        Object.defineProperty(this, "tag", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: tag
        });
        _Base_secret.set(this, 1);
        Object.defineProperty(this, "ro", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 2
        });
        Object.defineProperty(this, "field", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "definite", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get secret() { return __classPrivateFieldGet(this, _Base_secret, "f"); }
    set secret(v) { __classPrivateFieldSet(this, _Base_secret, v, "f"); }
    method(u) { return u; }
    overloaded(x) { return x; }
}
exports.Base = Base;
_Base_secret = new WeakMap(), _Base_instances = new WeakSet(), _Base_priv = function _Base_priv() { return __classPrivateFieldIn(_Base_secret, this); };
Object.defineProperty(Base, "count", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 0
});
(() => {
    Base.count++;
})();
class Derived extends Base {
    constructor(name, more) {
        console.log("before");
        super(name);
        Object.defineProperty(this, "more", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: more
        });
        Object.defineProperty(this, "extra", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.name.length
        });
        console.log("after");
    }
    get() { return 1; }
    method(u) { return super.method(u); }
}
exports.Derived = Derived;
class Accessors {
    constructor() {
        _Accessors_size_accessor_storage.set(this, 3);
    }
    get size() { return __classPrivateFieldGet(this, _Accessors_size_accessor_storage, "f"); }
    set size(value) { __classPrivateFieldSet(this, _Accessors_size_accessor_storage, value, "f"); }
    static get total() { return __classPrivateFieldGet(_a, _a, "f", _Accessors_total_accessor_storage); }
    static set total(value) { __classPrivateFieldSet(_a, _a, value, "f", _Accessors_total_accessor_storage); }
}
_a = Accessors, _Accessors_size_accessor_storage = new WeakMap();
_Accessors_total_accessor_storage = { value: void 0 };
const anon = class {
    *[Symbol.iterator]() { yield 1; }
};
exports.anon = anon;
