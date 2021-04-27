"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.ExampleEnvironment = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ExampleEnvironment {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ExampleEnvironment.prototype, "REDIS_SERVICE_HOST", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], ExampleEnvironment.prototype, "REDIS_SERVICE_PORT", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ExampleEnvironment.prototype, "REDIS_SERVICE_URI", void 0);
exports.ExampleEnvironment = ExampleEnvironment;
function validate(config) {
    const validatedConfig = class_transformer_1.plainToClass(ExampleEnvironment, config, {
        enableImplicitConversion: true,
    });
    const errors = class_validator_1.validateSync(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
exports.validate = validate;
//# sourceMappingURL=example-environment.validation.js.map