export { a, b } from "./0" with { type: "json" };
export * as ns from "./0" with { type: "json" };
import defer * as lazy from "./lazy.js";
import defer from "./named-defer.js";
lazy.go(defer);
