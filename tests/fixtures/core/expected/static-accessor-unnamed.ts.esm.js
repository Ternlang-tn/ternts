var _a;
export const X = class {
    static #a_accessor_storage = 1;
    static get a() { return _a.#a_accessor_storage; }
    static set a(value) { _a.#a_accessor_storage = value; }
};
export default class default_1 {
    static #b_accessor_storage = 2;
    static get b() { return default_1.#b_accessor_storage; }
    static set b(value) { default_1.#b_accessor_storage = value; }
}
