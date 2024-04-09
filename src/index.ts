import 'reflect-metadata';

import { fastify } from 'fastify';

import './shared/container'
import { dashboardRoutes } from './routes/dashboard';
import { AddJobController } from './controller/AddJobController';

const app = fastify();

app.register(dashboardRoutes);

app.get('/add-job', async () => {
  const controller = new AddJobController()
  await controller.handle();
})

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
