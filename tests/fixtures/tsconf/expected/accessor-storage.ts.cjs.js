class C2 {
    #a1_accessor_storage = 1;
    #a1_1_accessor_storage = 2;
    get a1() { return this.#a1_1_accessor_storage; }
    set a1(value) { this.#a1_1_accessor_storage = value; }
}
class C3 {
    static #a2_accessor_storage = 1;
    static {
        class Inner {
            #a2_1_accessor_storage = 2;
            get a2() { return this.#a2_1_accessor_storage; }
            set a2(value) { this.#a2_1_accessor_storage = value; }
        }
    }
}
