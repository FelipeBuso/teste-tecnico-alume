import prisma from "../../prisma/client";
import bcrypt from "bcryptjs";
import { FastifyInstance } from "fastify";

export async function createStudent(data: {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
}) {
  const hashedPassword = await bcrypt.hash(data.senha, 10);
  return prisma.estudante.create({
    data: {
      nome: data.nome,
      sobrenome: data.sobrenome,
      email: data.email,
      senha: hashedPassword,
    },
    select: {
      id: true,
      nome: true,
      sobrenome: true,
      email: true,
    },
  });
}

export async function loginStudent(
  fastify: FastifyInstance,
  email: string,
  senha: string
) {
  const student = await prisma.estudante.findUnique({ where: { email } });

  if (!student) {
    throw new Error("Invalid credentials");
  }
  const isValid = await bcrypt.compare(senha, student.senha);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  return fastify.jwt.sign({ sub: student.id });
}

export async function getStudentById(id: number) {
  return prisma.estudante.findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      sobrenome: true,
      email: true,
    },
  });
}
