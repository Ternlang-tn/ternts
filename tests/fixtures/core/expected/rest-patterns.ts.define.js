var x, y, z;
[{ ...x }] = [{ abc: 1 }];
for ([{ ...y }] of [[{ abc: 1 }]])
    ;
for ({ a: z, ...y } of [{ a: 1, b: 2 }])
    ;
