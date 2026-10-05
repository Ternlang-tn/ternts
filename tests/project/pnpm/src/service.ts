// pnpm layout: pkg-a is a symlink into .pnpm, and re-exports pkg-b, which sits beside it there
// (EventEmitter2 from @nestjs/event-emitter, re-exported from eventemitter2)
import { Injectable } from "./decorators";
import { Emitter, Options, Client, Config } from "pkg-a";
@Injectable()
export class Service {
  constructor(e: Emitter, o: Options, c: Client, cfg: Config) {}
}
