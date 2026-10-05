import { ValidationPipe as Base } from "@nestjs/common";
let Pipe = class extends Base {
    run() { return Base; }
};
function later() { const Base = 1; return Base; }
export { Pipe, later };
