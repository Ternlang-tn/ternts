class Test {
    set #value(v) { }
    get #only() { return 1; }
    m() {
        const foo = { bar: 1 };
        console.log(this.#value);
        this.#only = 2;
        ({ ...this.#value } = { foo });
        ({ foo: { ...this.#value.foo } } = { foo });
        let r = ({ ...this.#value } = { foo });
    }
}
