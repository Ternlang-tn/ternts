class C {
    method() {
        function other() { }
        var fn = async () => await other.apply(this, arguments);
    }
}
async function f3(x = z) { return async () => arguments; }
function f11() { return async (x = z) => arguments; }
