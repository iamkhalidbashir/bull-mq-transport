import { JobsOptions } from 'bullmq';

export interface IBullMqEvent<T> {
  jobOptions: JobsOptions;
  payload: T;
}
