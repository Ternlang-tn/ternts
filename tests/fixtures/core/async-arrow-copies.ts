// a lowered async arrow's parameter copies are named before its rest's copy
const tryExec = async (cwd: string, args: string[], input?: string, ...rest: any[]) => { return [cwd, args, input, rest]; };
const e2 = async (a: any, b = 1) => a + b;
async function f(args: any, ...more: any[]) {}
