// no semicolons: a lowered statement starting with ( must not continue the line before
declare const o: any
o.m()
o.f()?.y
o.n()
o.g() ?? 1
declare const c: any
o.p()
c.foo["baz"] ??= o.q()
