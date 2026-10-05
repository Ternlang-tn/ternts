const A = class {
    static s = 1;
    #x = 1;
};
const B = class E {
    static s = 1;
    #x = 1;
};
const C = class {
    #x = 1;
};
f(class {
    #x = 1;
    static s = 1;
});
