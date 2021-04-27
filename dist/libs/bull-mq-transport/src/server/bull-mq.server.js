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
exports.BullMqServer = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const bull_mq_constants_1 = require("../constants/bull-mq.constants");
const queue_scheduler_factory_1 = require("../factories/queue-scheduler.factory");
const worker_factory_1 = require("../factories/worker.factory");
let BullMqServer = class BullMqServer extends microservices_1.Server {
    constructor(options, queueSchedulerFactory, workerFactory) {
        super();
        this.options = options;
        this.queueSchedulerFactory = queueSchedulerFactory;
        this.workerFactory = workerFactory;
        this.logger = new common_1.Logger(this.constructor.name);
        this.workers = new Map();
        this.schedulers = new Map();
        this.initializeSerializer(this.serializer);
        this.initializeDeserializer(this.deserializer);
    }
    listen(callback) {
        for (const [pattern, handler] of this.messageHandlers) {
            if (pattern &&
                handler &&
                !this.workers.has(pattern) &&
                !this.schedulers.has(pattern)) {
                const scheduler = this.queueSchedulerFactory.create(pattern, {
                    connection: this.options.connection,
                });
                const worker = this.workerFactory.create(pattern, async (job) => {
                    const value = await handler(job.data.payload, job);
                    return new Promise((resolve, reject) => {
                        const stream$ = this.transformToObservable(value).pipe(operators_1.catchError((err) => rxjs_1.of(err)));
                        this.send(stream$, (packet) => {
                            if (packet.err) {
                                return reject(packet.err);
                            }
                            resolve(packet.response);
                        });
                    });
                }, { connection: this.options.connection });
                this.schedulers.set(pattern, scheduler);
                this.workers.set(pattern, worker);
                this.logger.log(`Registered queue "${pattern}"`);
            }
        }
        callback();
    }
    async close() {
        for (const worker of this.workers.values()) {
            await worker.close();
        }
        for (const scheduler of this.schedulers.values()) {
            await scheduler.close();
        }
    }
};
BullMqServer = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(bull_mq_constants_1.BULLMQ_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object, queue_scheduler_factory_1.QueueSchedulerFactory,
        worker_factory_1.WorkerFactory])
], BullMqServer);
exports.BullMqServer = BullMqServer;
//# sourceMappingURL=bull-mq.server.js.map