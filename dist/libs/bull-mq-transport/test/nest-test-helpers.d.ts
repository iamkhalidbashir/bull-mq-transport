/// <reference types="jest" />
import { Abstract, Provider, Type } from '@nestjs/common';
export declare type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T];
export declare type FunctionsOf<T> = Pick<T, FunctionPropertyNames<T>>;
export declare type Mock<T> = T & {
    [K in keyof FunctionsOf<T>]: jest.Mock<ReturnType<T[K]>, Parameters<T[K]>>;
};
export declare const createMockFromClass: <T>(_Ctor: Type<T> | Abstract<T>) => Mock<T>;
export declare const createMockProvider: <T>(Ctor: Type<any> | Abstract<any>) => Provider<T>;
export declare const createMockProviders: (...ctors: Array<Type<any> | Abstract<any>>) => Provider<unknown>[];
