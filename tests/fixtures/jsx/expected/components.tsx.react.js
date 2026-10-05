"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
exports.Generic = Generic;
exports.default = App;
const react_1 = require("react");
const button_1 = require("./button");
const List = ({ title, items = [] }) => {
    const [n, setN] = (0, react_1.useState)(0);
    return (react_1.default.createElement("div", { className: "list", "data-n": n, id: "x" },
        react_1.default.createElement("h1", null,
            title,
            " & more \u00A0"),
        items.map((it, i) => react_1.default.createElement("li", { key: i }, it)),
        react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(button_1.Button, { onClick: () => setN(n + 1), disabled: true }),
            react_1.default.createElement(button_1.Button.Icon, { name: "plus" }),
            react_1.default.createElement("svg:rect", { "xlink:href": "#a" })),
        "text with   spaces",
        react_1.default.createElement("input", { value: 'q"uote', key: "k", ...rest, after: "1" })));
};
exports.List = List;
function Generic(p) { return react_1.default.createElement("span", null, String(p.v)); }
function App() { return react_1.default.createElement(exports.List, { title: "t" }); }
