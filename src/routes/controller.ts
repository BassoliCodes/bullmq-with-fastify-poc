import { FastifyInstance } from "fastify";
import { AddJobController } from "../controller/AddJobController";

const addJobController = new AddJobController();

export async function controllerRoutes(app: FastifyInstance) {
  app.get('/add-job', addJobController.handle);
}