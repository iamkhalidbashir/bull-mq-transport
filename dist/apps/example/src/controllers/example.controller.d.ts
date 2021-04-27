import { BullMqClient } from '@xdave/bull-mq-transport';
import { Job } from 'bullmq';
import { ExampleHelloWorldSent } from '../events/example-hello-world-sent.event';
export declare class ExampleController {
    private readonly client;
    constructor(client: BullMqClient);
    sendHello(): import("rxjs").Observable<any>;
    handleHello(event: ExampleHelloWorldSent, job: Job): void;
    thing(): import("rxjs").Observable<any>;
    handleThing(msg: string, job: Job): Promise<{
        reply: string;
    }>;
}
