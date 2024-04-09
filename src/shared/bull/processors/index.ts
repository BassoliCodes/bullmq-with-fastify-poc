import { container } from "tsyringe";
import { ConsoleJob } from "../jobs/console";

interface IQueueList {
  key: string;
  processorName: string;
  processorDescription?: string;
  processor: any;
}


const consoleJob = container.resolve(ConsoleJob);

export const queueList: IQueueList[] = [
  {
    key: 'ConsoleJob',
    processorName: ConsoleJob.name,
    processorDescription: 'Send a console.log to the console',
    processor: consoleJob.handle,
  },
];
