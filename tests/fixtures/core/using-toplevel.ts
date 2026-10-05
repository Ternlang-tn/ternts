using top = { [Symbol.dispose]() {} };
await using later = { async [Symbol.asyncDispose]() {} };
export const after = 1;
