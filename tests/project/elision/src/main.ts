// without `import type`: a whole-program build drops the names that are types
import { Order, OrderId, OrdersService, Status, LIMIT } from "./models";
import { RenamedOrder, Svc, Id } from "./barrel";
import * as all from "./models";
import { Order as OnlyType } from "./models";
export { Order, OrdersService };
export { RenamedOrder } from "./barrel";
const o: Order = new OrdersService().find("1" as OrderId);
const r: RenamedOrder = o;
const s = new Svc();
let id: Id = "x";
export const out = [o, r, s, id, Status.Open, LIMIT, all.LIMIT];
let t: OnlyType;
