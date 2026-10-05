// 9ed0b63: a class expression in a let initializer that uses an import, then a local of the same name
import { ValidationPipe as Base } from "@nestjs/common";
let Pipe = class extends Base { run() { return Base; } };
function later() { const Base = 1; return Base; }
export { Pipe, later };
