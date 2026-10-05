import { thing } from "./thing";
import { jest } from "@jest/globals";
const local = 1;
jest.mock("./thing", () => ({ thing: 2 }));
jest.unmock("./other");
describe("x", () => { it("y", () => expect(thing).toBe(2)); });
