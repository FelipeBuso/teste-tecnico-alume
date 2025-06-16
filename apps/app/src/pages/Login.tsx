import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { InputController } from "../components/form/inputContoller";

const schema = yup.object({
  email: yup.string().email().required("Email obrigatório"),
  senha: yup.string().min(4).required("Senha obrigatória"),
});

type LoginForm = yup.InferType<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const { login } = useAuth();

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.senha);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Credenciais inválidas");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputController
            register={register}
            label="E-mail"
            name="email"
            id="email"
            type="email"
            errors={errors}
          />

          <InputController
            register={register}
            label="Senha"
            name="senha"
            id="senha"
            type="password"
            errors={errors}
          />

          <p className="text-sm text-center mt-4">
            Não tem uma conta?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-indigo-600 underline"
            >
              Cadastre-se
            </button>
          </p>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
