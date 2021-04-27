import { IBullMqModuleOptions, IBullMqModuleOptionsFactory } from '@xdave/bull-mq-transport';
import { ExampleRedisConfigService } from './example-redis-config.service';
export declare class ExampleBullMqConfigService implements IBullMqModuleOptionsFactory {
    private readonly config;
    constructor(config: ExampleRedisConfigService);
    createModuleOptions(): IBullMqModuleOptions;
}
