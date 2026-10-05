// a decorated accessor: a literal computed key as it is, a computed one through the temp the
// decorators cached (no second temp)
declare let dec: any;
const field3 = "field3";
class C {
    @dec(1) accessor field1 = 1;
    @dec(2) accessor ["field2"] = 2;
    @dec(3) accessor [field3] = 3;
}
