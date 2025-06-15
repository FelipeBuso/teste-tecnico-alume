// src/pages/Register.tsx
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiAxios } from "../../services/api";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  sobrenome: yup.string().required("Sobrenome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Senha é obrigatória"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas não coincidem")
    .required("Confirmação de senha é obrigatória"),
});

type FormDataType = yup.InferType<typeof schema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormDataType>({ resolver: yupResolver(schema) });

  const navigate = useNavigate();

  const onSubmit = async (data: FormDataType) => {
    const api = apiAxios();
    const url = import.meta.env.VITE_API_URL;
    try {
      await api.post(url + "/register", {
        nome: data.nome,
        sobrenome: data.sobrenome,
        email: data.email,
        senha: data.senha,
      });
      navigate("/login");
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      alert("Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Cadastro de Estudante
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input
              {...register("nome")}
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
            />
            {errors.nome && (
              <p className="text-red-500 text-xs">{errors.nome.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Sobrenome</label>
            <input
              {...register("sobrenome")}
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
            />
            {errors.sobrenome && (
              <p className="text-red-500 text-xs">
                {errors.sobrenome?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Senha</label>
            <input
              type="password"
              {...register("senha")}
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
            />
            {errors.senha && (
              <p className="text-red-500 text-xs">{errors.senha.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Confirmar Senha</label>
            <input
              type="password"
              {...register("confirmarSenha")}
              className="mt-1 w-full border rounded px-3 py-2 text-sm"
            />
            {errors.confirmarSenha && (
              <p className="text-red-500 text-xs">
                {errors.confirmarSenha.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
