import { Queue, Worker } from 'bullmq';

import { IQueue } from '../interface/IQueue';
import { queueOptions } from '../interface/IQueueOptions';
import { queueList } from '../processors';
import { redisConfig } from '../../../config/redis';

export class BullQueue implements IQueue {
  public queues: Queue[] = [];
  private workers: Worker[] = [];

  constructor() {
    console.info('[Bull] Initializing...');

    const useCaseDefaultQueue = new Queue('UseCaseDefaultQueue', queueOptions);

    console.info(`[Bull] Queue ${useCaseDefaultQueue.name} created`);

    this.queues.push(useCaseDefaultQueue);

    queueList.forEach(({ key, processor }) => {
      const foundQueue = this.queues.find(queue => queue.name === key);

      if (!foundQueue) {
        const bullQueue = new Queue(key, queueOptions);
        const foundWorker = this.workers.find(worker => worker.name === key);

        if (!foundWorker) {
          this.workers.push(
            new Worker(
              key,
              async job => {
                await processor.handle(job.data);
              },
              { connection: redisConfig },
            ),
          );
        }

        console.info(`[Bull] Queue ${bullQueue.name} created`);

        bullQueue.addListener('completed', job => {
          console.info(`[Bull] Job ${job.id} completed`);
        });

        bullQueue.addListener('failed', job => {
          console.info(`[Bull] Job ${job.id} failed`);
        });

        this.queues.push(bullQueue);
      }
    });
  }

  public getQueues() {
    return this.queues;
  }

  public getWorkers() {
    return this.workers;
  }

  public addToQueue<T>(queueName: string, data: T) {
    const foundQueue = this.queues.find(queue => queue.name === queueName);

    if (!foundQueue) {
      throw new Error(`[Bull] Queue ${queueName} not found`);
    }

    foundQueue.add(queueName, data as T);

    console.info(`[Bull] Job added to queue ${queueName}`);
  }
}
