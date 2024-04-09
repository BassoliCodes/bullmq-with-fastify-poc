import { createBullBoard } from '@bull-board/api';
import { FastifyAdapter } from '@bull-board/fastify';
import { FastifyInstance } from 'fastify';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';

import { container } from 'tsyringe';
import { BullQueue } from '../shared/bull/implementation/BullMQ';

export async function dashboardRoutes(app: FastifyInstance) {
  const serverQueueAdapter = new FastifyAdapter();

  const queues = container.resolve(BullQueue).getQueues();

  createBullBoard({
    queues: queues.map(queue => new BullMQAdapter(queue, {
      description: queue.name
    })),
    serverAdapter: serverQueueAdapter,
    options: {
      uiConfig: {
        locale: { lng: 'pt-BR' },
      },
    },
  });

  const queuesDashboardBasePath = '/admin/queues';

  serverQueueAdapter.setBasePath(queuesDashboardBasePath);

  app.register(serverQueueAdapter.registerPlugin(), {
    basePath: '',
    prefix: queuesDashboardBasePath,
  });
}