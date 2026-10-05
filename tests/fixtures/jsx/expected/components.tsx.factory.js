import { useState } from "react";
import { Button } from "./button";
export const List = ({ title, items = [] }) => {
    const [n, setN] = useState(0);
    return (h("div", { className: "list", "data-n": n, id: "x" },
        h("h1", null,
            title,
            " & more \u00A0"),
        items.map((it, i) => h("li", { key: i }, it)),
        h(Fragment, null,
            h(Button, { onClick: () => setN(n + 1), disabled: true }),
            h(Button.Icon, { name: "plus" }),
            h("svg:rect", { "xlink:href": "#a" })),
        "text with   spaces",
        h("input", { value: 'q"uote', key: "k", ...rest, after: "1" })));
};
export function Generic(p) { return h("span", null, String(p.v)); }
export default function App() { return h(List, { title: "t" }); }
