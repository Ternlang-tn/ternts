// whitespace around the dots of a member tag name: tsc writes the name without it
declare var A: any;
const a = <A . B . C.D x="1">foo</A . B . C.D>;
const b = <A. B />;
