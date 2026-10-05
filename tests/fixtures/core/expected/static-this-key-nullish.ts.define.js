class W {
    static X = "x";
    static P = { [this.X]: 1 };
    static Q = this.X;
}
const x2 = a ?? 1;
const x4 = a ?? 1;
const x7 = a?.b;
