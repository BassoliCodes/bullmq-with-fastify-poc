import { BullQueue } from '../shared/bull/implementation/BullMQ';
import { container } from 'tsyringe';

interface IJobPayload {
  name: string;
  age: number;
  programmer: boolean;
  languages: string[];
}

export class AddJobController {
  async handle() {
    console.log('AddJobController');

    const bull = container.resolve(BullQueue);

    const payload: IJobPayload = {
      name: 'Lucca Bassoli',
      age: 21,
      programmer: true,
      languages: ['Javascript', 'Typescript'],
    };

    bull.addToQueue<IJobPayload>('ConsoleJob', payload);
  }
}
