export enum Color { Red, Green = 5, Blue }
export enum Dir { Up = "UP", Down = "DOWN" }
export const enum Flags { None = 0, A = 1 << 0, B = 1 << 1, AB = A | B }
enum Mixed { X = 1, Y = X * 2, Z = "z".length }
declare enum Ambient { Q }
export function use(c: Color, d: Dir) {
  return [c === Color.Red, d === Dir.Up, Flags.AB, Mixed.Y, Color[Color.Blue]];
}
