import { Job } from 'bullmq';
import { IConsoleJob } from '../interface/IConsoleJob';

export class ConsoleJob implements IConsoleJob {
  async handle(job:Job): Promise<void> {
    console.log('Data received: ', job.data);

    await job.updateProgress(50);

    await new Promise(resolve => setTimeout(resolve, 10000));

    await job.updateProgress(100);

    console.log('Data processed: ', job.data);
  }
}
