// target ESNext without useDefineForClassFields: accessors are lowered when fields move into
// the constructor (also when the field comes after the accessor)
class C5 {
  accessor y = 2;
  x = 0;
  accessor #x = 1;
}
class C6 {
  accessor z = 3;
  static s = 1;
}
