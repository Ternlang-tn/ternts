"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Area = exports.Geo = void 0;
var Geo;
(function (Geo) {
    Geo.PI = 3.14;
    function area(r) { return Geo.PI * r * r; }
    Geo.area = area;
    let Inner;
    (function (Inner) {
        Inner.depth = 2;
    })(Inner = Geo.Inner || (Geo.Inner = {}));
})(Geo || (exports.Geo = Geo = {}));
var Legacy;
(function (Legacy) {
    Legacy.y = Geo.area(2);
})(Legacy || (Legacy = {}));
exports.Area = Geo.area;
