// moduleResolution bundler (also node16/nodenext) reads package.json "exports": the class is
// itself and the type alias / enum serialize by kind
import { Injectable } from "./decorators";
import { Svc, Id, E } from "@scope/exp";
@Injectable()
export class UsesExports {
  constructor(s: Svc, id: Id, en: E) {}
}
