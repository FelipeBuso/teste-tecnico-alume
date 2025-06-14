import { FastifyRequest, FastifyReply } from "fastify";
import { createStudent, loginStudent, getStudentById } from "./student.service";

export async function registerStudentHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { nome, sobrenome, email, senha } = request.body as any;
  const student = await createStudent({ nome, sobrenome, email, senha });
  return reply.status(201).send(student);
}

export async function loginStudentHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, senha } = request.body as any;

  const token = await loginStudent(request.server, email, senha);
  return reply.send({ accessToken: token });
}

export async function getMeHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  console.log("user:", request.user);
  const id = request.user.sub;
  const student = await getStudentById(id);

  if (!student) {
    return reply.status(404).send({ message: "Student not found" });
  }

  return reply.send(student);
}
