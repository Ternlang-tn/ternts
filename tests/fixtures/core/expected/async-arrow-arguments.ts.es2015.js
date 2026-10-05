var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class C {
    method() {
        function other() { }
        var fn = () => {
            var arguments_1 = arguments;
            return __awaiter(this, void 0, void 0, function* () { return yield other.apply(this, arguments_1); });
        };
    }
}
function f3() {
    var arguments_2 = arguments;
    return __awaiter(this, arguments, void 0, function* (x = z) { return () => __awaiter(this, void 0, void 0, function* () { return arguments_2; }); });
}
function f11() { return (...args_1) => {
    var arguments_3 = arguments;
    return __awaiter(this, [...args_1], void 0, function* (x = z) { return arguments_3; });
}; }
