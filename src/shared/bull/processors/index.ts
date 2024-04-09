import { ConsoleJob } from '../../../jobs/ConsoleJob';

interface IQueueList {
  key: string;
  processorName: string;
  processorDescription?: string;
  processor: any;
}

export const queueList: IQueueList[] = [
  {
    key: 'ConsoleJob',
    processorName: ConsoleJob.name,
    processorDescription: 'Send a console.log to the console',
    processor: ConsoleJob,
  },
];
