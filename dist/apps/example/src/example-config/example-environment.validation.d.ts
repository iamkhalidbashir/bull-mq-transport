export declare class ExampleEnvironment {
    REDIS_SERVICE_HOST: string;
    REDIS_SERVICE_PORT: number;
    REDIS_SERVICE_URI: string;
}
export declare function validate(config: Record<string, unknown>): ExampleEnvironment;
