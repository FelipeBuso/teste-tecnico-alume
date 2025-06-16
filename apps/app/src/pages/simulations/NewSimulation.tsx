import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiAxios } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { InputController } from "../../components/form/inputContoller";

const simulationSchema = yup.object({
  valorTotal: yup
    .number()
    .min(1000, "Valor mínimo de R$ 1.000,00")
    .positive("Informe um valor positivo")
    .required("Valor total é obrigatório"),
  quantidadeParcelas: yup
    .number()
    .integer()
    .min(2, "Quantidade mínima de parcelas é 2")
    .positive("Deve ser um número positivo")
    .required("Quantidade de parcelas é obrigatória"),
  jurosAoMes: yup
    .number()
    .min(1, "Juros não pode ser negativo")
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
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Nova Simulação de Financiamento
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputController
          register={register}
          label="Valor Total"
          name="valorTotal"
          id="valorTotal"
          type="number"
          errors={errors}
        />
        <InputController
          register={register}
          label="Quantidade de Parcelas"
          name="quantidadeParcelas"
          id="quantidadeParcelas"
          type="number"
          errors={errors}
        />

        <InputController
          register={register}
          label="Juros ao Mês (%)"
          name="jurosAoMes"
          id="jurosAoMes"
          type="number"
          errors={errors}
        />

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
