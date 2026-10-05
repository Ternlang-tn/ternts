// enum members: a later one reads as 0 (as tsc evaluates it), itself as E.A; a template or a
// string member makes a string member (no reverse mapping)
enum Q { A = 1, B = C, C = 3, D = Q.E, E = 5, F = F }
declare const BAR: string;
enum Foo { A = `${BAR}`, C = (`${BAR}`), G = 2 + BAR.length, H = A, I = H + BAR, J = Foo.H }
