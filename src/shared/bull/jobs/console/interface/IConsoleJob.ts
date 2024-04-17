import { Job } from "bullmq";

export interface IConsoleJob {
  handle(job: Job): Promise<void>;
}
