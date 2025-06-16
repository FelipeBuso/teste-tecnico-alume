import { FastifyInstance } from "fastify";
import {
  registerStudentHandler,
  loginStudentHandler,
  getMeHandler,
  updateStudentHandler,
} from "./student.controller";

export default async function studentRoutes(app: FastifyInstance) {
  app.post("/register", registerStudentHandler);
  app.post("/login", loginStudentHandler);
  app.get("/me", { preHandler: [app.authenticate] }, getMeHandler);
  app.put("/me", { preHandler: [app.authenticate] }, updateStudentHandler);
}
