class W {
    static { this.X = "x"; }
    static { this.P = { [this.X]: 1 }; }
    static { this.Q = this.X; }
}
const x2 = a ?? 1;
const x4 = a ?? 1;
const x7 = a?.b;
