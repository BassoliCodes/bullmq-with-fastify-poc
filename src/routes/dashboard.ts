import { container } from 'tsyringe';

import { createBullBoard } from '@bull-board/api';
import { FastifyAdapter } from '@bull-board/fastify';
import { FastifyInstance } from 'fastify';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

import { BullQueue } from '../shared/bull/implementation/BullMQ';

export async function dashboardRoutes(app: FastifyInstance) {
  const serverQueueAdapter = new FastifyAdapter();
  const fastifyRegisterOptions = {
    basePath: '',
    prefix: '/admin/queues',
  };

  const queues = container.resolve(BullQueue).getQueues();

  createBullBoard({
    queues: queues.map(queue => new BullMQAdapter(queue)),
    serverAdapter: serverQueueAdapter,
    options: {
      uiConfig: {
        locale: { lng: 'pt-BR' },
        boardTitle: 'Task Manager',
      },
    },
  });

  serverQueueAdapter.setBasePath(fastifyRegisterOptions.prefix);

  app.register(serverQueueAdapter.registerPlugin(), fastifyRegisterOptions);
}
