import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  result: {
    simulacaoFinanciamento: {
      valorParcelaMensal: {
        needs: {
          valorTotal: true,
          jurosAoMes: true,
          quantidadeParcelas: true,
        },
        compute(data) {
          const pv = Number(data.valorTotal);
          const i = Number(data.jurosAoMes) / 100;
          const n = data.quantidadeParcelas;

          if (n === 0) return 0;
          if (i === 0) return Math.round((pv / n) * 100) / 100;

          const pmt = pv * (i / (1 - Math.pow(1 + i, -n)));
          return Math.round(pmt * 100) / 100;
        },
      },
    },
  },
});

export default prisma;
