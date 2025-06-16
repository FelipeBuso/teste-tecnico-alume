import * as yup from "yup";

export const createStudentSchema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  sobrenome: yup.string().required("Sobrenome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  senha: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("Senha é obrigatório"),
});

export async function validateCreateStudent(data: any) {
  return createStudentSchema.validate(data, { abortEarly: false });
}

export const updateStudentSchema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  sobrenome: yup.string().required("Sobrenome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
});

export async function validateUpdateStudent(data: any) {
  return updateStudentSchema.validate(data, { abortEarly: false });
}
