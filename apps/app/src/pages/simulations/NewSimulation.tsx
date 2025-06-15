import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiAxios } from "../../services/api";
import { useNavigate } from "react-router-dom";

const simulationSchema = yup.object({
  valorTotal: yup
    .number()
    .positive("Informe um valor positivo")
    .required("Valor total é obrigatório"),
  quantidadeParcelas: yup
    .number()
    .integer()
    .positive("Deve ser um número positivo")
    .required("Quantidade de parcelas é obrigatória"),
  jurosAoMes: yup
    .number()
    .min(0, "Juros não pode ser negativo")
    .required("Juros ao mês é obrigatório"),
});

type SimulationFormData = yup.InferType<typeof simulationSchema>;

export default function NewSimulation() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SimulationFormData>({
    resolver: yupResolver(simulationSchema),
    defaultValues: {
      valorTotal: 0,
      quantidadeParcelas: 0,
      jurosAoMes: 0,
    },
  });

  const onSubmit = async (data: SimulationFormData) => {
    const api = apiAxios();
    const url = import.meta.env.VITE_API_URL;
    try {
      await api.post(url + "/simulations", data);
      navigate("/simulations");
    } catch (error) {
      console.error("Erro ao criar simulação:", error);
      alert("Erro ao criar simulação");
    }
  };

  const valorTotal = watch("valorTotal");
  const jurosAoMes = watch("jurosAoMes");
  const quantidadeParcelas = watch("quantidadeParcelas");

  const calcularParcelaMensal = () => {
    const pv = Number(valorTotal);
    const i = Number(jurosAoMes) / 100;
    const n = Number(quantidadeParcelas);
    if (pv > 0 && i > 0 && n > 0) {
      if (n === 0) return 0;
      if (i === 0) return pv / n;

      const pmt = pv * (i / (1 - Math.pow(1 + i, -n)));
      return pmt;
    }
    return 0;
  };

  const valorParcela = calcularParcelaMensal();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Nova Simulação de Financiamento
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="valorTotal"
            className="block text-sm font-medium text-gray-700"
          >
            Valor Total do Financiamento
          </label>
          <input
            {...register("valorTotal")}
            type="number"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.valorTotal && (
            <p className="mt-1 text-sm text-red-600">
              {errors.valorTotal.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="quantidadeParcelas"
            className="block text-sm font-medium text-gray-700"
          >
            Quantidade de Parcelas
          </label>
          <input
            {...register("quantidadeParcelas")}
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.quantidadeParcelas && (
            <p className="mt-1 text-sm text-red-600">
              {errors.quantidadeParcelas.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="jurosAoMes"
            className="block text-sm font-medium text-gray-700"
          >
            Juros ao Mês (%)
          </label>
          <input
            {...register("jurosAoMes")}
            type="number"
            step="0.01"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.jurosAoMes && (
            <p className="mt-1 text-sm text-red-600">
              {errors.jurosAoMes.message}
            </p>
          )}
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-700">
            Valor estimado da parcela mensal:{" "}
            <span className="font-semibold text-indigo-600">
              R$ {valorParcela.toFixed(2)}
            </span>
          </p>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-500"
          >
            Salvar Simulação
          </button>
        </div>
      </form>
    </div>
  );
}
