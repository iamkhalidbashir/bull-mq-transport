import { Logger } from '@nestjs/common';
import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { QueueScheduler, Worker } from 'bullmq';
import { QueueSchedulerFactory } from '../factories/queue-scheduler.factory';
import { WorkerFactory } from '../factories/worker.factory';
import { IBullMqModuleOptions } from '../interfaces/bull-mq-module-options.interface';
export declare class BullMqServer extends Server implements CustomTransportStrategy {
    private readonly options;
    private readonly queueSchedulerFactory;
    private readonly workerFactory;
    protected readonly logger: Logger;
    protected readonly workers: Map<string, Worker<any, any, string>>;
    protected readonly schedulers: Map<string, QueueScheduler>;
    constructor(options: IBullMqModuleOptions, queueSchedulerFactory: QueueSchedulerFactory, workerFactory: WorkerFactory);
    listen(callback: () => void): void;
    close(): Promise<void>;
}
