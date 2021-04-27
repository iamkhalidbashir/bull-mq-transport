import { ConfigService } from '@nestjs/config';
import { ExampleEnvironment } from './example-environment.validation';
export declare class ExampleRedisConfigService {
    private readonly config;
    constructor(config: ConfigService<ExampleEnvironment>);
    get host(): string;
    get port(): number;
    get uri(): string;
}
