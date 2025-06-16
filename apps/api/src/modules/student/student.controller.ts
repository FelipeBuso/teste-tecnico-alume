import { FastifyRequest, FastifyReply } from "fastify";
import {
  createStudent,
  loginStudent,
  getStudentById,
  updateStudent,
} from "./student.service";
import { validateCreateStudent, validateUpdateStudent } from "./student.schema";

export async function registerStudentHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = await validateCreateStudent(request.body);

    const student = await createStudent(body);
    return reply.status(201).send(student);
  } catch (error: any) {
    return reply.status(400).send({
      message: "Erro na validação dos dados",
      errors: error.errors ?? error,
    });
  }
}

export async function loginStudentHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { email, senha } = request.body as any;

  const res = await loginStudent(request.server, email, senha);
  return reply.send(res);
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

export async function updateStudentHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const studentId = request.user.sub;
  try {
    const body = await validateUpdateStudent(request.body);
    const updatedStudent = await updateStudent(studentId, body);

    return reply.send(updatedStudent);
  } catch (error: any) {
    return reply.status(400).send({
      message: "Erro na validação dos dados",
      errors: error.errors ?? error,
    });
  }
}
