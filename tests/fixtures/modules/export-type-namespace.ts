// export lists skip a namespace without values (it isn't one at run time)
namespace uninstantiated { export type T = 1; }
namespace inst { export const v = 1; }
export { uninstantiated, inst };
