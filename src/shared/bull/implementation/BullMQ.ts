import { Queue, Worker } from 'bullmq';
import { IQueue } from '../interface/IQueue';
import { queueOptions } from '../interface/IQueueOptions';
import { queueList } from '../processors';
import { redisConfig } from '../../../config/redis';

interface IJobData {
  id: string;
}

export class BullQueue implements IQueue {
  private queues: Map<string, Queue> = new Map();
  private workers: Map<string, Worker> = new Map();

  constructor() {
    console.info('[Bull] Initializing...');

    queueList.forEach(({ key, processor }) => {
      if (!this.queues.has(key)) {
        const bullQueue = new Queue(key, queueOptions);
        this.queues.set(key, bullQueue);

        const worker = new Worker(
          key,
          async ({ data }) => {
            await processor.bind()(data as IJobData);
          },
          {
            connection: redisConfig,
            concurrency: 1,
          },
        );

        worker.on('completed', job => {
          console.info(`[Bull] Job ${job.name} completed`);
        });

        worker.on('progress', job => {
          console.info(`[Bull] Job ${job.name} progress: ${job.progress}%`);
        });

        worker.on('error', err => {
          console.error(`[Bull] Error: ${err.message}`);
        });

        worker.on('failed', job => {
          console.info(`[Bull] Job ${job?.name} failed`);
        });

        this.workers.set(key, worker);

        console.info(`[Bull] Queue ${bullQueue.name} created`);
      }
    });
  }

  public getQueues() {
    return Array.from(this.queues.values());
  }

  public getWorkers() {
    return Array.from(this.workers.values());
  }

  public addToQueue<T>(queueName: string, data: T) {
    const foundQueue = this.queues.get(queueName);

    if (!foundQueue) {
      throw new Error(`[Bull] Queue ${queueName} not found`);
    }

    foundQueue.add(queueName, data as T);

    console.info(`[Bull] Job added to queue ${queueName}`);
  }
}
