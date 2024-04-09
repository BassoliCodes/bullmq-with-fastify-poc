import { Queue, Worker } from "bullmq";

export interface IQueue {
  addToQueue(queueName: string, data: { id: string }): void;
  getQueues(): Queue[];
  getWorkers(): Worker[];
}