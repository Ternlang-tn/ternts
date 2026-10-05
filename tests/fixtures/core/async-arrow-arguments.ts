// below ES2017 `arguments` in an async arrow is the enclosing function's: captured by the
// lowered async function around it, or else by the arrow (a generator has its own arguments)
class C {
    method() {
        function other() {}
        var fn = async () => await other.apply(this, arguments);
    }
}
async function f3(x = z) { return async () => arguments; }
function f11() { return async (x = z) => arguments; }
declare const z: any;
