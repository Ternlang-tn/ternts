// a declared class's type parameters and heritage may hold braces
declare class Model<M extends MR, MR extends {}> { getField<K extends keyof M>(): M[K] }
declare class Sub extends Model<{ a: 1 }, {}> implements I<{}> {}
let z = 1;
