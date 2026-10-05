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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
{
    class C {
        static x = (() => {
            let _classDecorators = [dec];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var class_1 = class {
                static { _classThis = this; }
                static { __setFunctionName(_classThis, "x"); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    class_1 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                }
            };
            return class_1 = _classThis;
        })();
    }
}
{
    class C {
        static "x" = (() => {
            let _classDecorators = [dec];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var class_2 = class {
                static { _classThis = this; }
                static { __setFunctionName(_classThis, "x"); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    class_2 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                }
            };
            return class_2 = _classThis;
        })();
    }
}
{
    class C {
        static 0 = (() => {
            let _classDecorators = [dec];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var class_3 = class {
                static { _classThis = this; }
                static { __setFunctionName(_classThis, "0"); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    class_3 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                }
            };
            return class_3 = _classThis;
        })();
    }
}
{
    class C {
        static ["x"] = (() => {
            let _classDecorators = [dec];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var class_4 = class {
                static { _classThis = this; }
                static { __setFunctionName(_classThis, "x"); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    class_4 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                }
            };
            return class_4 = _classThis;
        })();
    }
}
{
    class C {
        static [0] = (() => {
            let _classDecorators = [dec];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var class_5 = class {
                static { _classThis = this; }
                static { __setFunctionName(_classThis, "0"); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    class_5 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                }
            };
            return class_5 = _classThis;
        })();
    }
}
{
    class C {
        static __proto__ = (() => {
            let _classDecorators = [dec];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var class_6 = class {
                static { _classThis = this; }
                static { __setFunctionName(_classThis, "__proto__"); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    class_6 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                }
            };
            return class_6 = _classThis;
        })();
    }
}
{
    class C {
        static "__proto__" = (() => {
            let _classDecorators = [dec];
            let _classDescriptor;
            let _classExtraInitializers = [];
            let _classThis;
            var class_7 = class {
                static { _classThis = this; }
                static { __setFunctionName(_classThis, "__proto__"); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                    class_7 = _classThis = _classDescriptor.value;
                    if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                    __runInitializers(_classThis, _classExtraInitializers);
                }
            };
            return class_7 = _classThis;
        })();
    }
}
{
    class C {
        static x = (() => {
            let _y_decorators;
            let _y_initializers = [];
            let _y_extraInitializers = [];
            return class {
                static { __setFunctionName(this, "x"); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _y_decorators = [dec];
                    __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
                    if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                }
                y = __runInitializers(this, _y_initializers, void 0);
                constructor() {
                    __runInitializers(this, _y_extraInitializers);
                }
            };
        })();
    }
}
{
    class C {
        static "x" = (() => {
            let _y_decorators;
            let _y_initializers = [];
            let _y_extraInitializers = [];
            return class {
                static { __setFunctionName(this, "x"); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _y_decorators = [dec];
                    __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
                    if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                }
                y = __runInitializers(this, _y_initializers, void 0);
                constructor() {
                    __runInitializers(this, _y_extraInitializers);
                }
            };
        })();
    }
}
{
    class C {
        static 0 = (() => {
            let _y_decorators;
            let _y_initializers = [];
            let _y_extraInitializers = [];
            return class {
                static { __setFunctionName(this, "0"); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _y_decorators = [dec];
                    __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
                    if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                }
                y = __runInitializers(this, _y_initializers, void 0);
                constructor() {
                    __runInitializers(this, _y_extraInitializers);
                }
            };
        })();
    }
}
{
    class C {
        static ["x"] = (() => {
            let _y_decorators;
            let _y_initializers = [];
            let _y_extraInitializers = [];
            return class {
                static { __setFunctionName(this, "x"); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _y_decorators = [dec];
                    __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
                    if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                }
                y = __runInitializers(this, _y_initializers, void 0);
                constructor() {
                    __runInitializers(this, _y_extraInitializers);
                }
            };
        })();
    }
}
{
    class C {
        static [0] = (() => {
            let _y_decorators;
            let _y_initializers = [];
            let _y_extraInitializers = [];
            return class {
                static { __setFunctionName(this, "0"); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _y_decorators = [dec];
                    __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
                    if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                }
                y = __runInitializers(this, _y_initializers, void 0);
                constructor() {
                    __runInitializers(this, _y_extraInitializers);
                }
            };
        })();
    }
}
{
    class C {
        static __proto__ = (() => {
            let _y_decorators;
            let _y_initializers = [];
            let _y_extraInitializers = [];
            return class {
                static { __setFunctionName(this, "__proto__"); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _y_decorators = [dec];
                    __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
                    if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                }
                y = __runInitializers(this, _y_initializers, void 0);
                constructor() {
                    __runInitializers(this, _y_extraInitializers);
                }
            };
        })();
    }
}
{
    class C {
        static "__proto__" = (() => {
            let _y_decorators;
            let _y_initializers = [];
            let _y_extraInitializers = [];
            return class {
                static { __setFunctionName(this, "__proto__"); }
                static {
                    const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                    _y_decorators = [dec];
                    __esDecorate(null, null, _y_decorators, { kind: "field", name: "y", static: false, private: false, access: { has: obj => "y" in obj, get: obj => obj.y, set: (obj, value) => { obj.y = value; } }, metadata: _metadata }, _y_initializers, _y_extraInitializers);
                    if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                }
                y = __runInitializers(this, _y_initializers, void 0);
                constructor() {
                    __runInitializers(this, _y_extraInitializers);
                }
            };
        })();
    }
}
{
    let C = (() => {
        let _static_x_decorators;
        let _static_x_initializers = [];
        let _static_x_extraInitializers = [];
        return class C {
            static {
                const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                _static_x_decorators = [dec];
                __esDecorate(null, null, _static_x_decorators, { kind: "field", name: "x", static: true, private: false, access: { has: obj => "x" in obj, get: obj => obj.x, set: (obj, value) => { obj.x = value; } }, metadata: _metadata }, _static_x_initializers, _static_x_extraInitializers);
                if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
            }
            static x = __runInitializers(this, _static_x_initializers, (() => {
                let _classDecorators = [dec];
                let _classDescriptor;
                let _classExtraInitializers = [];
                let _classThis;
                var class_8 = class {
                    static { _classThis = this; }
                    static { __setFunctionName(_classThis, "x"); }
                    static {
                        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
                        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
                        class_8 = _classThis = _classDescriptor.value;
                        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
                        __runInitializers(_classThis, _classExtraInitializers);
                    }
                };
                return class_8 = _classThis;
            })());
            static {
                __runInitializers(this, _static_x_extraInitializers);
            }
        };
    })();
}
