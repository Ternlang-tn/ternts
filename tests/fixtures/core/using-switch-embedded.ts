// a switch with using as the body of an if: lowered into a block
async function f(c: boolean) {
  if (c)
    switch (0) {
      case 0:
        await using d = { async [Symbol.asyncDispose]() {} };
        break;
    }
  if (c) switch (1) { case 1: break; }
}
