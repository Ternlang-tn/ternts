class B {
    static s = 1;
}
class C extends B {
    #x = 1;
    m(a, b, c) {
        this.#x *= a + b;
        this.#x -= a - b;
        this.#x ??= c ? a : b;
        this.#x **= a ** b;
        this.#x ||= (c && a);
        return this.#x;
    }
    static y = (super.s *= 2 + 3);
}
