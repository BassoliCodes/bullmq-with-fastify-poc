import { IConsoleJob } from '../interface/IConsoleJob';

export class ConsoleJob implements IConsoleJob {
  async handle(data: unknown) {
    console.log('Data received: ', data);

    await new Promise(resolve => setTimeout(resolve, 10000));

    console.log('Data processed: ', data);
  }
}
