// a var in a top-level block is the module's: an export list exports it after its declaration
// (not one inside a function); and `declare namespace N {};` keeps its empty statement
export { y };
if (Math.random()) {
    var y = 1;
}
function g() { if (1) { var y = 2; } }
declare namespace N { type _ = 1; };
