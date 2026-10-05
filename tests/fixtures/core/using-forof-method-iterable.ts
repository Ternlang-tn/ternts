// for (using d of [{ [Symbol.dispose]() {} }]): the declaration goes in the loop body, not in
// the first block of the iterable (a method's)
for (using d1 of [{ [Symbol.dispose]() {} }, null, undefined]) {
}
export {};
