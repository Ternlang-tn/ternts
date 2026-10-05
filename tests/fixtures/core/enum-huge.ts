// enum members beyond 64 bits: folded as JavaScript numbers (no crash)
enum Q { A = 1e20, B = -1e19, C = 1e20 | 0, D = 1180591620717411303424 >>> 0, E = -4294967297 | 0, F = 123456789012345678901 ^ 1, G = 2.5 | 0, H = -2.5 >>> 0, I = 1e300 << 1 }
enum R { A = 9007199254740992, B = A * A, C = B * B, D = C * C, E = D * D, F = E * E }
enum M { A = 7 % 3, B = -7 % 3, C = 7.5 % 2, D = 1e300 % 7, G = 1e20 % 3, H = -0.5 % 1 }
enum P { C = 2 ** 10 }
