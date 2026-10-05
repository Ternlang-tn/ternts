// \u{...} escapes in identifiers and private names
export class IdentifierNameWithExtendedEscape {
  \u{78}: number;
  #\u{79} = 1;
  constructor() { this.\u{78} = 0; }
  doThing() { this.x = 42; return this.#y; }
}
var \u{61}bc = 1;
