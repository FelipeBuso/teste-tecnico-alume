import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiAxios } from "../../services/api";
import type { IStudent } from "../interfaces";

export default function StudentProfile() {
  const [student, setStudent] = useState<IStudent>();
  const navigate = useNavigate();

  const getStudent = async () => {
    const api = apiAxios();
    const url = import.meta.env.VITE_API_URL;
    try {
      const res = await api.get(`${url}/me`);
      if (res.data) {
        setStudent(res.data);
      }
    } catch (error) {
      console.error("Error fetching simulations:", error);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Dados Cadastrais</h2>
      <div className="space-y-2">
        <p>
          <strong>Nome:</strong> {student?.nome}
        </p>
        <p>
          <strong>Sobrenome:</strong> {student?.sobrenome}
        </p>
        <p>
          <strong>Email:</strong> {student?.email}
        </p>
      </div>
      <div className="mt-6">
        <button
          onClick={() => navigate("/students/edit")}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
        >
          Editar Dados
        </button>
      </div>
    </div>
  );
}
