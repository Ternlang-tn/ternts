// using in a constructor, with field initializers before or after super()
class C1 {}
class C2 extends C1 {
  y = 1;
  constructor() {
    super();
    using d = { [Symbol.dispose]() {} };
  }
}
class C3 { z = 2; constructor() { using e = null; } }
