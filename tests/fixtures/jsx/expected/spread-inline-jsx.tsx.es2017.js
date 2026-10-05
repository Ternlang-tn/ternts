import { jsx as _jsx } from "react/jsx-runtime";
const a = _jsx(Comp, { w: 1 });
const b = _jsx(Comp, { w: _jsx("div", { children: "x" }) });
const c = _jsx(Comp, { w: _jsx("div", {}) });
