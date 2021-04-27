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
exports.BullMqClient = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const bull_mq_constants_1 = require("../constants/bull-mq.constants");
const queue_events_factory_1 = require("../factories/queue-events.factory");
const queue_factory_1 = require("../factories/queue.factory");
let BullMqClient = class BullMqClient extends microservices_1.ClientProxy {
    constructor(options, queueFactory, queueEventsFactory) {
        super();
        this.options = options;
        this.queueFactory = queueFactory;
        this.queueEventsFactory = queueEventsFactory;
        this.queues = new Map();
    }
    async connect() {
        return;
    }
    async close() {
        for (const [, queue] of this.queues) {
            await queue.close();
        }
    }
    publish(packet, callback) {
        const queue = this.getQueue(packet.pattern);
        const events = this.queueEventsFactory.create(packet.pattern, {
            connection: this.options.connection,
        });
        events.on('completed', (job) => callback({
            response: job.returnvalue,
            isDisposed: true,
        }));
        events.on('failed', (job) => callback({
            err: job.failedReason,
            isDisposed: true,
        }));
        queue
            .add(packet.pattern, packet.data.payload, packet.data.jobOptions)
            .then(async (job) => await job.waitUntilFinished(events));
        return () => events.close().then();
    }
    async dispatchEvent(packet) {
        const queue = this.getQueue(packet.pattern);
        await queue.add(packet.pattern, packet.data.payload, packet.data.jobOptions);
    }
    getQueue(pattern) {
        var _a;
        const queue = (_a = this.queues.get(pattern)) !== null && _a !== void 0 ? _a : this.queueFactory.create(pattern, {
            connection: this.options.connection,
        });
        this.queues.set(pattern, queue);
        return queue;
    }
};
BullMqClient = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(bull_mq_constants_1.BULLMQ_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object, queue_factory_1.QueueFactory,
        queue_events_factory_1.QueueEventsFactory])
], BullMqClient);
exports.BullMqClient = BullMqClient;
//# sourceMappingURL=bull-mq.client.js.map