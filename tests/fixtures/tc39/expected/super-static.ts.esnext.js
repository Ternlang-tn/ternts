const method = "method";
@dec
class C extends Base {
    static a = super.method();
    static b = super["method"]();
    static c = super[method]();
    static d = super.method ``;
    static e = super["method"] ``;
    static f = super[method] ``;
}
