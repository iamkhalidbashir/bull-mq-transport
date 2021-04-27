"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const example_bull_mq_config_service_1 = require("./example-bull-mq-config.service");
const example_environment_validation_1 = require("./example-environment.validation");
const example_redis_config_service_1 = require("./example-redis-config.service");
let ExampleConfigModule = class ExampleConfigModule {
};
ExampleConfigModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                validate: example_environment_validation_1.validate,
                expandVariables: true,
                cache: true,
                isGlobal: true,
            }),
        ],
        providers: [example_redis_config_service_1.ExampleRedisConfigService, example_bull_mq_config_service_1.ExampleBullMqConfigService],
        exports: [example_redis_config_service_1.ExampleRedisConfigService, example_bull_mq_config_service_1.ExampleBullMqConfigService],
    })
], ExampleConfigModule);
exports.ExampleConfigModule = ExampleConfigModule;
//# sourceMappingURL=example-config.module.js.map