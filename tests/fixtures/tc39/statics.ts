declare var dec: any;
@dec class C { static s = 1; static { this.q = 2; } @dec m() {} x = 3; @dec static t = this.s; }
class D { @dec static u = 1; @dec m() {} }
