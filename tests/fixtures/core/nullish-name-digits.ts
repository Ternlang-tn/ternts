// a variable named like a module variable (z_0) is still a property access: z_0.b ??= 5 reads
// z_0.b once, through a temp
declare let z_0: any, mod: any;
z_0.b ??= 5;
z_0.b ||= 6;
const w = z_0.c ?? 1;
z_0 ??= 2;
