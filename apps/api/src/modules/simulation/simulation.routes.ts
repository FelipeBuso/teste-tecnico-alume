import { FastifyInstance } from "fastify";
import {
  createSimulationHandler,
  listSimulationsHandler,
} from "./simulation.controller";

export default async function simulationRoutes(app: FastifyInstance) {
  app.post("/", { preHandler: [app.authenticate] }, createSimulationHandler);

  app.get(
    "/",
    {
      preHandler: [app.authenticate],
      schema: {
        querystring: {
          type: "object",
          properties: {
            start: { type: "string", default: "0" },
            end: { type: "string", default: "10" },
          },
          required: [],
          additionalProperties: false,
        },
      },
    },
    listSimulationsHandler
  );
}
