import { BullQueue } from "../shared/bull/implementation/BullMQ";
import { container } from "tsyringe";


export class AddJobController {
  async handle() {
    console.log('AddJobController');

    const bull = container.resolve(BullQueue);

    bull.addToQueue('ConsoleJob', { id: '1' });
  }
}