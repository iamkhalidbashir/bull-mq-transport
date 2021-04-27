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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const bull_mq_transport_1 = require("@xdave/bull-mq-transport");
const bullmq_1 = require("bullmq");
const uuid_1 = require("uuid");
const example_hello_world_sent_event_1 = require("../events/example-hello-world-sent.event");
let ExampleController = class ExampleController {
    constructor(client) {
        this.client = client;
    }
    sendHello() {
        return this.client.emit('events', {
            id: uuid_1.v4(),
            payload: new example_hello_world_sent_event_1.ExampleHelloWorldSent('Hello, world!'),
            // delay: 4000,
        });
    }
    handleHello(event, job) {
        console.log('got event:', event, job.id);
    }
    thing() {
        return this.client.send('things', {
            id: uuid_1.v4(),
            payload: 'hello thing',
        });
    }
    async handleThing(msg, job) {
        console.log('got message:', msg, job.id);
        return { reply: msg.toUpperCase() };
    }
};
__decorate([
    common_1.Get('hello'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "sendHello", null);
__decorate([
    microservices_1.EventPattern('events'),
    __param(0, microservices_1.Payload()), __param(1, microservices_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [example_hello_world_sent_event_1.ExampleHelloWorldSent, bullmq_1.Job]),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "handleHello", null);
__decorate([
    common_1.Get('thing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExampleController.prototype, "thing", null);
__decorate([
    microservices_1.MessagePattern('things'),
    __param(0, microservices_1.Payload()), __param(1, microservices_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, bullmq_1.Job]),
    __metadata("design:returntype", Promise)
], ExampleController.prototype, "handleThing", null);
ExampleController = __decorate([
    common_1.Controller('example'),
    __metadata("design:paramtypes", [bull_mq_transport_1.BullMqClient])
], ExampleController);
exports.ExampleController = ExampleController;
//# sourceMappingURL=example.controller.js.map