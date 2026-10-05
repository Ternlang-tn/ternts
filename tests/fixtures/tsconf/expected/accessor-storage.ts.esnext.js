class C2 {
    #a1_accessor_storage = 1;
    accessor a1 = 2;
}
class C3 {
    static #a2_accessor_storage = 1;
    static {
        class Inner {
            accessor a2 = 2;
        }
    }
}
