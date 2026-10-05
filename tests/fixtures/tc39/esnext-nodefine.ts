// ESNext with useDefineForClassFields off: tsc still runs its decorators transform (it only
// keeps decorators as written at ESNext with define semantics)
declare const dec: any;
class C {
  @dec m() {}
  @dec static s() {}
  @dec f = 1;
}
