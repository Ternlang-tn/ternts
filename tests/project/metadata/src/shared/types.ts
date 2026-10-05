export interface Shape { x: number }
export type Name = string;
export type Kind = "a" | "b";
export enum Color { Red = "red", Blue = "blue" }
export enum Num { One = 1 }
export class Repo {}
export const MODES = { CHAT: "chat", BUILDER: "builder" } as const;
export type Mode = (typeof MODES)[keyof typeof MODES];
export const LEVELS = ["low", "high"] as const;
export const ALIASED = LEVELS;
export type Level = (typeof ALIASED)[number];
export type Fn = () => void;
export type Maybe = string | null;
export type Big = bigint;
