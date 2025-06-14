import { FastifyRequest, FastifyReply } from "fastify";
import { createSimulation, listSimulations } from "./simulation.service";
import { validateCreateSimulation } from "./simulation.schema";

export async function createSimulationHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const validatedData = await validateCreateSimulation(request.body);
    console.log("Creating simulation with data:", validatedData);
    const studentId = request.user.sub;
    const simulation = await createSimulation(studentId, validatedData);
    return reply.status(201).send(simulation);
  } catch (error: any) {
    return reply.status(400).send({ message: error.errors });
  }
}

export async function listSimulationsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const studentId = request.user.sub;
  const simulations = await listSimulations(studentId);
  return reply.send(simulations);
}
