class A {
    static { this.a = 1; }
}
class C extends A {
    static { this.z8 = [super.a] = [0]; }
    static { this.z9 = [super["a"] = 1] = [0]; }
    static { this.z10 = [...super.a] = [0]; }
    static { this.z11 = { x: super.a } = { x: 0 }; }
    static { this.z12 = { x: super["a"] = 1 } = { x: 0 }; }
    static { this.z13 = { ...super.a } = { x: 0 }; }
}
class A2 {
    static { this.a = 1; }
}
class C2 extends A2 {
    static { this.v1 = [super.a]; }
    static { this.v2 = f([super.a], 1); }
    static { this.v3 = { x: super.a }; }
    static { this.v4 = (super.a, 2); }
}
