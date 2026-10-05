async function* f1(x, y = z) { }
async function* f2({ [z]: x }) { }
async function* f3(a, b) { yield 1; }
const f4 = async function* (p = 1) { };
class K {
    async *m(x, y = z, { ...w }) { }
    static async *n({ a }) { }
}
