import { FastifyInstance } from "fastify";
import { dashboardRoutes } from "./dashboard";

export async function routes(app: FastifyInstance) {
  dashboardRoutes(app);
}