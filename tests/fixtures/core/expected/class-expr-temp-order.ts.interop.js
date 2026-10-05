const A = class {
    static { this.s = 1; }
    #x = 1;
};
const B = class E {
    static { this.s = 1; }
    #x = 1;
};
const C = class {
    #x = 1;
};
f(class {
    #x = 1;
    static { this.s = 1; }
});
