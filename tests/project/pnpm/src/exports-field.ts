// a package whose types are only in package.json "exports": with module commonjs, tsc's
// default resolution (node10) ignores "exports", so these are unresolved (guarded) for tsc
import { Injectable } from "./decorators";
import { Svc, Id, E } from "@scope/exp";
@Injectable()
export class UsesExports {
  constructor(s: Svc, id: Id, en: E) {}
}
