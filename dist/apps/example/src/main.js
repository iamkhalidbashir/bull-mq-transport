"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleBoostrap = void 0;
const core_1 = require("@nestjs/core");
const bull_mq_transport_1 = require("@xdave/bull-mq-transport");
const example_module_1 = require("./example.module");
const exampleBoostrap = async () => {
    const app = await core_1.NestFactory.create(example_module_1.ExampleModule);
    const options = { inheritAppConfig: true };
    const bullMqServer = app.get(bull_mq_transport_1.BullMqServer);
    app.connectMicroservice({ strategy: bullMqServer }, options);
    await app.startAllMicroservicesAsync();
    await app.listen(3000);
};
exports.exampleBoostrap = exampleBoostrap;
exports.exampleBoostrap().catch((err) => console.log(err));
//# sourceMappingURL=main.js.map