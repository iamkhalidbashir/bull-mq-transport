import { QueueScheduler, QueueSchedulerOptions } from 'bullmq';
export declare class QueueSchedulerFactory {
    create(name: string, options?: QueueSchedulerOptions): QueueScheduler;
}
