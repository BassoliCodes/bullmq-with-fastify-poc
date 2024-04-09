import { Queue, Worker } from "bullmq";

export interface IQueue {
  addToQueue<T>(queueName: string, data: T): void;
  getQueues(): Queue[];
  getWorkers(): Worker[];
}