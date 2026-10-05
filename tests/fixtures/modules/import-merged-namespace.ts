// an instantiated namespace with an import's name shadows the import: references go to it
import { A } from "./b";
namespace A {
  export const displayName = "A";
}

A();
A.displayName;
