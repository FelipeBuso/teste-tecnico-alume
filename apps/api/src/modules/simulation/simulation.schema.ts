import * as yup from "yup";

export const createSimulationSchema = yup.object({
  valorTotal: yup.number().positive().required("Valor total é obrigatório"),
  quantidadeParcelas: yup.number().integer().positive().required(),
  jurosAoMes: yup.number().min(0).required("Juros ao mês é obrigatório"),
});

export async function validateCreateSimulation(data: any) {
  return createSimulationSchema.validate(data, { abortEarly: false });
}
