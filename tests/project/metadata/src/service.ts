import { Injectable, Prop } from "./decorators";
import { Shape, Name, Kind, Color, Num, Repo, Mode, Level, Fn, Maybe, Big } from "./shared/types";
import { RenamedRepo } from "./shared";
import { Color as AliasedColor } from "@app/types";
import type { Repo as TypeOnlyRepo } from "./shared/types";
@Injectable()
export class Service {
  @Prop() shape: Shape;
  @Prop() name: Name;
  @Prop() kind: Kind;
  @Prop() color: Color;
  @Prop() num: Num;
  @Prop() repo: Repo;
  @Prop() mode: Mode;
  @Prop() level: Level;
  @Prop() fn: Fn;
  @Prop() maybe: Maybe;
  @Prop() big: Big;
  @Prop() renamed: RenamedRepo;
  @Prop() aliased: AliasedColor;
  @Prop() typeOnly: TypeOnlyRepo;
  constructor(private readonly repo2: Repo, private renamed2: RenamedRepo, s: Shape, m: Mode) {}
}
