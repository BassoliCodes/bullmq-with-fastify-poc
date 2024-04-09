import { container } from 'tsyringe';
import { BullQueue } from '../implementation/BullMQ';

const bullQueue = container.resolve(BullQueue);

bullQueue.getWorkers().forEach(worker => {
  console.info(`[Bull] Worker ${worker.name} started`);
});

console.info('[Bull] Workers started');
