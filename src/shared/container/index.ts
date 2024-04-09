import { container } from 'tsyringe';
import { IQueue } from '../bull/interface/IQueue';
import { BullQueue } from '../bull/implementation/BullMQ';
import { IConsoleJob } from '../bull/jobs/console/interface/IConsoleJob';
import { ConsoleJob } from '../bull/jobs/console/implementation';

container.registerSingleton<IQueue>('BullQueue', BullQueue);
container.registerSingleton<IConsoleJob>('ConsoleJob', ConsoleJob);

console.info('[Container] Initialized');
