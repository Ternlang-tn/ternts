var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const tryExec = (cwd, args, input, ...rest) => __awaiter(void 0, void 0, void 0, function* () { return [cwd, args, input, rest]; });
const e2 = (a_1, ...args_1) => __awaiter(void 0, [a_1, ...args_1], void 0, function* (a, b = 1) { return a + b; });
function f(args, ...more) {
    return __awaiter(this, void 0, void 0, function* () { });
}
