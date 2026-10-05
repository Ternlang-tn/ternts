// top-level `using` before a legacy-decorated unnamed default class: default_1 = class { }
export {};

declare var dec: any;

using before = null;

@dec
export default class {
}
