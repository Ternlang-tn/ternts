const out = [];
for (let i = 0; i < 3; ++i) {
    out.push(class C {
        #f = i;
        get() { return this.#f; }
    });
}
console.log(out.map(K => new K().get()).join());
while (out.length) {
    const K = out.pop();
    function g() { return class {
        #z = 1;
    }; }
    g();
}
