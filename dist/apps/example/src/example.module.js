"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const bull_mq_transport_1 = require("@xdave/bull-mq-transport");
const example_controller_1 = require("./controllers/example.controller");
const example_bull_mq_config_service_1 = require("./example-config/example-bull-mq-config.service");
const example_config_module_1 = require("./example-config/example-config.module");
let ExampleModule = class ExampleModule {
};
ExampleModule = __decorate([
    common_1.Module({
        imports: [
            bull_mq_transport_1.BullMqModule.forRootAsync({
                imports: [example_config_module_1.ExampleConfigModule],
                useClass: example_bull_mq_config_service_1.ExampleBullMqConfigService,
            }),
            example_config_module_1.ExampleConfigModule,
        ],
        providers: [
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({ transform: true }),
            },
        ],
        controllers: [example_controller_1.ExampleController],
    })
], ExampleModule);
exports.ExampleModule = ExampleModule;
//# sourceMappingURL=example.module.js.map