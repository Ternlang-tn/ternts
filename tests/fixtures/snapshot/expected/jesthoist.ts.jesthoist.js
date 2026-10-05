"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
globals_1.jest.mock("./thing", () => ({ thing: 2 }));
globals_1.jest.unmock("./other");
const thing_1 = require("./thing");

const local = 1;


describe("x", () => { it("y", () => expect(thing_1.thing).toBe(2)); });
