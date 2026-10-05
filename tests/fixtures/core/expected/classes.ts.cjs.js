"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.anon = exports.Derived = exports.Base = void 0;
class Base {
    static { this.count = 0; }
    #secret;
    static { Base.count++; }
    constructor(name, id, tag = "t") {
        this.name = name;
        this.id = id;
        this.tag = tag;
        this.#secret = 1;
        this.ro = 2;
    }
    get secret() { return this.#secret; }
    set secret(v) { this.#secret = v; }
    #priv() { return #secret in this; }
    method(u) { return u; }
    overloaded(x) { return x; }
}
exports.Base = Base;
class Derived extends Base {
    constructor(name, more) {
        console.log("before");
        super(name);
        this.more = more;
        this.extra = this.name.length;
        console.log("after");
    }
    get() { return 1; }
    method(u) { return super.method(u); }
}
exports.Derived = Derived;
class Accessors {
    #size_accessor_storage = 3;
    get size() { return this.#size_accessor_storage; }
    set size(value) { this.#size_accessor_storage = value; }
    static #total_accessor_storage;
    static get total() { return Accessors.#total_accessor_storage; }
    static set total(value) { Accessors.#total_accessor_storage = value; }
}
const anon = class {
    *[Symbol.iterator]() { yield 1; }
};
exports.anon = anon;
