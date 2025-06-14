import { FastifyInstance } from "fastify";
import {
  createSimulationHandler,
  listSimulationsHandler,
} from "./simulation.controller";

export default async function simulationRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: [app.authenticate] }, createSimulationHandler);

  app.get("/", { preHandler: [app.authenticate] }, listSimulationsHandler);
}
