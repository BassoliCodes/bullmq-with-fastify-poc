import 'reflect-metadata';

import { fastify } from 'fastify';

import './shared/container';
import { routes } from './routes';

const app = fastify();

app.register(routes);

app.listen({ port: 3333, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
