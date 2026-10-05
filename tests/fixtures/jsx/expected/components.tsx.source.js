"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
exports.Generic = Generic;
exports.default = App;
const jsx_runtime_1 = require("preact/jsx-runtime");
const react_1 = require("react");
const button_1 = require("./button");
const List = ({ title, items = [] }) => {
    const [n, setN] = (0, react_1.useState)(0);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "list", "data-n": n, id: "x", children: [(0, jsx_runtime_1.jsxs)("h1", { children: [title, " & more \u00A0"] }), items.map((it, i) => (0, jsx_runtime_1.jsx)("li", { children: it }, i)), (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(button_1.Button, { onClick: () => setN(n + 1), disabled: true }), (0, jsx_runtime_1.jsx)(button_1.Button.Icon, { name: "plus" }), (0, jsx_runtime_1.jsx)("svg:rect", { "xlink:href": "#a" })] }), "text with   spaces", (0, jsx_runtime_1.jsx)("input", { value: 'q"uote', ...rest, after: "1" }, "k")] }));
};
exports.List = List;
function Generic(p) { return (0, jsx_runtime_1.jsx)("span", { children: String(p.v) }); }
function App() { return (0, jsx_runtime_1.jsx)(exports.List, { title: "t" }); }
