// enum folding with non-finite results: no crash (tsc folds them to Infinity / NaN and keeps the text of a member that is one)
enum P { A = 2 ** 1e300, B = 2 ** -1e300, C = 2 ** 10, D = 2 ** 0.5, E = (0/0) ** 2 }
enum M2 { A = 7 % 3, B = -7 % 3, C = 7.5 % 2, D = 1e300 % 7, E = 5 % (1/0), F = (1/0) % 2, G = 1e20 % 3, H = -0.5 % 1 }
