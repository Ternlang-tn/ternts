class C5 {
    constructor() {
        this.#y_accessor_storage = 2;
        this.x = 0;
        this.#x_accessor_storage = 1;
    }
    #y_accessor_storage;
    get y() { return this.#y_accessor_storage; }
    set y(value) { this.#y_accessor_storage = value; }
    #x_accessor_storage;
    get #x() { return this.#x_accessor_storage; }
    set #x(value) { this.#x_accessor_storage = value; }
}
class C6 {
    accessor z = 3;
    static { this.s = 1; }
}
