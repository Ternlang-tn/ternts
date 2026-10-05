class A {
    static { this.x = 1; }
}
class B extends A {
    static { this.a = super.x++; }
    static { this.b = --super.x; }
    static { this.c = super["x"]++; }
    static { super.x++; ++super.x; }
}
class A2 {
    static { this.x = 1; }
}
class B2 extends A2 {
    static { const q = super.x++; }
}
class C3 extends B3 {
    static { this.y5 = this?.[("x")](); }
    static { this.z5 = super.a = 0; }
    static { this.z6 = super.a += 1; }
    static { this.z14 = ++super.a; }
    static { this.z16 = ++super[("a")]; }
    static { this.z17 = super[k()]++; }
    static { this.z18 = super.a ``; }
    static { super.a = 1; super[k()]++; }
}
