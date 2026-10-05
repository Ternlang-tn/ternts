import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from "react";
import { Button } from "./button";
export const List = ({ title, items = [] }) => {
    const [n, setN] = useState(0);
    return (_jsxs("div", { className: "list", "data-n": n, id: "x", children: [_jsxs("h1", { children: [title, " & more \u00A0"] }), items.map((it, i) => _jsx("li", { children: it }, i)), _jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => setN(n + 1), disabled: true }), _jsx(Button.Icon, { name: "plus" }), _jsx("svg:rect", { "xlink:href": "#a" })] }), "text with   spaces", _jsx("input", Object.assign({ value: 'q"uote' }, rest, { after: "1" }), "k")] }));
};
export function Generic(p) { return _jsx("span", { children: String(p.v) }); }
export default function App() { return _jsx(List, { title: "t" }); }
