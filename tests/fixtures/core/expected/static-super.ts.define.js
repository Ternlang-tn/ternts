const k = "v";
class C extends B {
    static a = super[k];
    static b = super.w(1, ...[2]);
    static { super.v += 1; super[k] = 3; const f = () => super.w(); }
}
const D = class extends B {
    static y = super.v;
};
