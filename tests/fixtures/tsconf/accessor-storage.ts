// an accessor's storage name is unique in the file (a 1 is added when the name is taken)
class C2 {
  #a1_accessor_storage = 1;
  accessor a1 = 2;
}
class C3 {
  static #a2_accessor_storage = 1;
  static {
    class Inner { accessor a2 = 2; }
  }
}
