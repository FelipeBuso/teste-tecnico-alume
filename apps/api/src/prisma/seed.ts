import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("123456", 10);

  const students = await prisma.estudante.createMany({
    data: [
      {
        nome: "Ana",
        sobrenome: "Silva",
        email: "ana@example.com",
        senha: password,
      },
      {
        nome: "Bruno",
        sobrenome: "Costa",
        email: "bruno@example.com",
        senha: password,
      },
      {
        nome: "Carla",
        sobrenome: "Souza",
        email: "carla@example.com",
        senha: password,
      },
      {
        nome: "Daniel",
        sobrenome: "Oliveira",
        email: "daniel@example.com",
        senha: password,
      },
    ],
  });

  const studentsDb = await prisma.estudante.findMany();

  const simulations = [
    { valorTotal: 10000, quantidadeParcelas: 12, jurosAoMes: 1.5 },
    { valorTotal: 5000, quantidadeParcelas: 6, jurosAoMes: 2.0 },
    { valorTotal: 20000, quantidadeParcelas: 24, jurosAoMes: 1.8 },
    { valorTotal: 15000, quantidadeParcelas: 18, jurosAoMes: 1.2 },
    { valorTotal: 8000, quantidadeParcelas: 10, jurosAoMes: 2.1 },
    { valorTotal: 3000, quantidadeParcelas: 4, jurosAoMes: 1.6 },
    { valorTotal: 12000, quantidadeParcelas: 15, jurosAoMes: 1.7 },
    { valorTotal: 2500, quantidadeParcelas: 3, jurosAoMes: 2.2 },
    { valorTotal: 9000, quantidadeParcelas: 9, jurosAoMes: 1.9 },
    { valorTotal: 11000, quantidadeParcelas: 11, jurosAoMes: 1.4 },
  ];

  let index = 0;
  for (const sim of simulations) {
    await prisma.simulacaoFinanciamento.create({
      data: {
        estudanteId: studentsDb[index % studentsDb.length].id,
        valorTotal: sim.valorTotal,
        quantidadeParcelas: sim.quantidadeParcelas,
        jurosAoMes: sim.jurosAoMes,
      },
    });
    index++;
  }

  console.log("Seeds criados com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
