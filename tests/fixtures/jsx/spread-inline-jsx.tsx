// a spread object literal with JSX in it is inlined too (skip_group skips JSX: <div>x</div>)
declare const React: any, Comp: any;
const a = <Comp {...{ w: 1 }} />;
const b = <Comp {...{ w: <div>x</div> }} />;
const c = <Comp {...{ w: <div /> }} />;
