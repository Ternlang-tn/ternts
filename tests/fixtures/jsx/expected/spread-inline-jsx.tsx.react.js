const a = React.createElement(Comp, { w: 1 });
const b = React.createElement(Comp, { w: React.createElement("div", null, "x") });
const c = React.createElement(Comp, { w: React.createElement("div", null) });
