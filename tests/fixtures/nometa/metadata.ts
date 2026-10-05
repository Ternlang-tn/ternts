import { Injectable, Inject, Prop } from "@nestjs/common";
import { Repo, Kind } from "./repo";
import type { OnlyType } from "./types";
import * as models from "./models";
enum Local { A, B }
enum LocalS { A = "a" }
interface Shape { x: number }
type Alias = string;
type Union = "a" | "b";
class LocalClass {}
const VALUES = ["x", "y"] as const;
@Injectable()
export class Service<G> {
  @Prop() s: string;
  @Prop() n: number;
  @Prop() b: boolean;
  @Prop() big: bigint;
  @Prop() sym: symbol;
  @Prop() arr: string[];
  @Prop() tuple: [number, string];
  @Prop() fn: () => void;
  @Prop() obj: { a: number };
  @Prop() any: any;
  @Prop() unk: unknown;
  @Prop() nul: string | null;
  @Prop() und?: number | undefined;
  @Prop() lit: "a" | "b";
  @Prop() union: Union;
  @Prop() mixed: string | number;
  @Prop() en: Local;
  @Prop() ens: LocalS;
  @Prop() iface: Shape;
  @Prop() alias: Alias;
  @Prop() cls: LocalClass;
  @Prop() imported: Repo;
  @Prop() importedEnum: Kind;
  @Prop() typeOnly: OnlyType;
  @Prop() nsType: models.User;
  @Prop() promise: Promise<number>;
  @Prop() date: Date;
  @Prop() map: Map<string, number>;
  @Prop() generic: G;
  @Prop() elem: (typeof VALUES)[number];
  @Prop() keyed: Shape["x"];
  @Prop() tmpl: `a${string}`;
  @Prop() never: never;
  @Prop() voidish: void;
  @Prop() self: Service<G>;
  constructor(private readonly repo: Repo, @Inject("TOKEN") token: string, other?: LocalClass) {}
  @Prop() method(a: number, b: Repo): Promise<Repo> { return null as any; }
  @Prop() get value(): number { return 1; }
  set value(v: number) {}
  @Prop() static st(x: string): void {}
  @Prop() noTypes(a, b) { return a; }
}
@Injectable()
class Merged { static of() { return new Merged(); } }
type Merged2 = number;
const Merged2 = 1;
export class UsesMerged { constructor(m: Merged, n: Merged2) {} }
export function paramDecorated(@Inject() x: number) {}
