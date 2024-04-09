import { FastifyInstance } from "fastify";

import { dashboardRoutes } from "./dashboard";
import { controllerRoutes } from "./controller";

export async function routes(app: FastifyInstance) {
  dashboardRoutes(app);
  controllerRoutes(app);

  console.info('[Routes] Initialized');
}