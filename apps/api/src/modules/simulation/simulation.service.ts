import prisma from "../../prisma/client";

export async function createSimulation(
  estudanteId: number,
  data: {
    valorTotal: number;
    jurosAoMes: number;
    quantidadeParcelas: number;
  }
) {
  return prisma.simulacaoFinanciamento.create({
    data: {
      estudanteId,
      valorTotal: data.valorTotal,
      jurosAoMes: data.jurosAoMes,
      quantidadeParcelas: data.quantidadeParcelas,
    },
  });
}

export async function listSimulations(estudanteId: number) {
  return prisma.simulacaoFinanciamento.findMany({
    where: { estudanteId },
    orderBy: { dataCriacao: "desc" },
  });
}
