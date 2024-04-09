import { BullQueue } from '../shared/bull/implementation/BullMQ';
import { container } from 'tsyringe';
import { IQueue } from '../shared/bull/interface/IQueue';
import { FastifyReply, FastifyRequest } from 'fastify';

interface IJobPayload {
  name: string;
  age: number;
  programmer: boolean;
  languages: string[];
}

export class AddJobController {
  async handle(_request: FastifyRequest, response: FastifyReply) {
    const bull = container.resolve<IQueue>(BullQueue);

    const payload: IJobPayload = {
      name: 'Lucca Bassoli',
      age: 21,
      programmer: true,
      languages: ['Javascript', 'Typescript'],
    };

    bull.addToQueue<IJobPayload>('ConsoleJob', payload);

    return response.status(201).send({
      message: 'Job added to queue',
      success: true,
    });
  }
}
