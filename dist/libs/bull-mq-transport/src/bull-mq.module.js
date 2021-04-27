"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BullMqModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BullMqModule = void 0;
const common_1 = require("@nestjs/common");
const bull_mq_core_module_1 = require("./bull-mq-core.module");
let BullMqModule = BullMqModule_1 = class BullMqModule {
    static forRoot(options) {
        return {
            module: BullMqModule_1,
            imports: [bull_mq_core_module_1.BullMqCoreModule.forRoot(options)],
        };
    }
    static forRootAsync(options) {
        return {
            module: BullMqModule_1,
            imports: [bull_mq_core_module_1.BullMqCoreModule.forRootAsync(options)],
        };
    }
};
BullMqModule = BullMqModule_1 = __decorate([
    common_1.Module({})
], BullMqModule);
exports.BullMqModule = BullMqModule;
//# sourceMappingURL=bull-mq.module.js.map