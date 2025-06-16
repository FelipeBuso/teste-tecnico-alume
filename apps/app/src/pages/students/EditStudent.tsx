import { useForm, type FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { apiAxios } from "../../services/api";
import type { IStudent } from "../interfaces";
import { InputController } from "../../components/form/inputContoller";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  sobrenome: yup.string().required("Sobrenome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
});

export default function EditStudent() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IStudent>({
    resolver: yupResolver(schema),
  });

  const getStudent = async () => {
    const api = apiAxios();
    const url = import.meta.env.VITE_API_URL;
    try {
      const res = await api.get(`${url}/me`);
      if (res.data) {
        reset(res.data);
      }
    } catch (error) {
      console.error("Error fetching simulations:", error);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    delete data.id;
    const api = apiAxios();
    const url = import.meta.env.VITE_API_URL;
    try {
      await api.put(url + "/me", data);
      navigate("/students");
    } catch (error) {
      console.error("Error fetching simulations:", error);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto bg-white shadow p-6 rounded-lg"
    >
      <h2 className="text-xl font-semibold mb-4">Editar Dados</h2>

      <div className="space-y-4">
        <InputController
          label="Nome"
          register={register}
          name="nome"
          id="nome"
          errors={errors}
        />

        <InputController
          label="Sobrenome"
          register={register}
          name="sobrenome"
          id="sobrenome"
          errors={errors}
        />

        <InputController
          label="E-mail"
          register={register}
          name="email"
          id="email"
          errors={errors}
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}
