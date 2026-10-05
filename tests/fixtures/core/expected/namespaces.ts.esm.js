export var Geo;
(function (Geo) {
    Geo.PI = 3.14;
    function area(r) { return Geo.PI * r * r; }
    Geo.area = area;
    let Inner;
    (function (Inner) {
        Inner.depth = 2;
    })(Inner = Geo.Inner || (Geo.Inner = {}));
})(Geo || (Geo = {}));
var Legacy;
(function (Legacy) {
    Legacy.y = Geo.area(2);
})(Legacy || (Legacy = {}));
export var Area = Geo.area;
