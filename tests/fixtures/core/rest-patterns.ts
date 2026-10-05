// object rest inside array patterns and for-of heads below ES2018
var x: any, y: any, z: any;
[{ ...x }] = [{ abc: 1 }];
for ([{ ...y }] of [[{ abc: 1 }]]) ;
for ({ a: z, ...y } of [{ a: 1, b: 2 }]) ;
