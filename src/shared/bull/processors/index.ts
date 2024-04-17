import { container } from "tsyringe";
import { ConsoleJob } from "../jobs/console";
import { Job } from "bullmq";

type TProcessor = (job: Job) => Promise<void>;

interface IQueueList {
  key: string;
  processorName: string;
  processorDescription?: string;
  processor: TProcessor;
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
