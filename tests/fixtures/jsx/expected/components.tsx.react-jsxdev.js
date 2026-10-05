import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";
const _jsxFileName = "components.tsx";
import React, { useState } from "react";
import { Button } from "./button";
export const List = ({ title, items = [] }) => {
    const [n, setN] = useState(0);
    return (_jsxDEV("div", { className: "list", "data-n": n, id: "x", children: [_jsxDEV("h1", { children: [title, " & more \u00A0"] }, void 0, true, { fileName: _jsxFileName, lineNumber: 8, columnNumber: 7 }, this), items.map((it, i) => _jsxDEV("li", { children: it }, i, false, { fileName: _jsxFileName, lineNumber: 9, columnNumber: 28 }, this)), _jsxDEV(_Fragment, { children: [_jsxDEV(Button, { onClick: () => setN(n + 1), disabled: true }, void 0, false, { fileName: _jsxFileName, lineNumber: 11, columnNumber: 9 }, this), _jsxDEV(Button.Icon, { name: "plus" }, void 0, false, { fileName: _jsxFileName, lineNumber: 12, columnNumber: 9 }, this), _jsxDEV("svg:rect", { "xlink:href": "#a" }, void 0, false, { fileName: _jsxFileName, lineNumber: 13, columnNumber: 9 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 10, columnNumber: 7 }, this), "text with   spaces", _jsxDEV("input", { value: 'q"uote', ...rest, after: "1" }, "k", false, { fileName: _jsxFileName, lineNumber: 17, columnNumber: 7 }, this)] }, void 0, true, { fileName: _jsxFileName, lineNumber: 6, columnNumber: 11 }, this));
};
export function Generic(p) { return _jsxDEV("span", { children: String(p.v) }, void 0, false, { fileName: _jsxFileName, lineNumber: 22, columnNumber: 50 }, this); }
export default function App() { return _jsxDEV(List, { title: "t" }, void 0, false, { fileName: _jsxFileName, lineNumber: 23, columnNumber: 39 }, this); }
