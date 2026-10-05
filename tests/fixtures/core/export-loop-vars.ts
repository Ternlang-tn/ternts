// top-level loop and block variables an export list exports: `for (var i = 0; ...)` hoists
// its declarations before the loop with the exports; for-in / for-of bodies start with the
// export; assignments inside blocks and the loop's update set the exports too
for (var i = 0, j = 2; i < j; i++) {}
for (var k in { a: 1 }) console.log(k);
for (var q of [1]) { q; }
for (var nx = 1; ;) break;
{ var a = 1; a = 2; }
if (a) { var b = 1; b++; }
export { i, j as jj, k, q, a, b };
