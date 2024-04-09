import { DefaultJobOptions, QueueOptions } from "bullmq";
import { redisConfig } from "../../../config/redis";

export const defaultJobOptions: DefaultJobOptions = {
  attempts: 3,
  timestamp: Date.now(),
  removeOnComplete: true,
}

export const queueOptions: QueueOptions = {
  connection: redisConfig,
  defaultJobOptions,
}