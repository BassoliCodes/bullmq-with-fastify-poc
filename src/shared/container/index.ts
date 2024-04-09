import { container } from 'tsyringe';
import { IQueue } from '../bull/interface/IQueue';
import { BullQueue } from '../bull/implementation/BullMQ';

container.resolve<IQueue>(BullQueue);

console.info('[Container] Initialized');
