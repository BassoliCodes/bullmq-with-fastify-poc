export interface IConsoleJob {
  handle(data: unknown): Promise<void>;
}
