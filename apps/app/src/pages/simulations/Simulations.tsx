import { useEffect, useState } from "react";
import type { ISimulation } from "../interfaces";
import { apiAxios } from "../../services/api";
import {
  parseDateToLocaleString,
  parseStringToCurrency,
  parseStringToPercentage,
} from "../../utils/parse";
import { useNavigate } from "react-router-dom";

export default function Simulations() {
  const navigate = useNavigate();
  const [simulationList, setSimulationList] = useState<ISimulation[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pagination, setPagination] = useState({
    start: 0,
    end: 10,
  });

  const getSimulations = async () => {
    const api = apiAxios();
    const url = import.meta.env.VITE_API_URL;
    try {
      const res = await api.get<ISimulation[]>(`${url}/simulations`, {
        params: { start: pagination.start, end: pagination.end },
      });
      if (res.data) {
        setSimulationList(res.data);
        setCurrentPage(res.data.length);

        const total = parseInt(res.headers["x-total-count"]);
        if (!isNaN(total)) {
          setTotalCount(total);
        }
      }
    } catch (error) {
      console.error("Error fetching simulations:", error);
    }
  };

  useEffect(() => {
    getSimulations();
  }, []);

  useEffect(() => {
    getSimulations();
  }, [pagination]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <p className="mt-2 text-sm text-gray-700">
            Histórico de simulações de financiamento realizadas.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            onClick={() => navigate("/simulations/new")}
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Nova simulação
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Data
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                  >
                    Valor Total
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                  >
                    Quantidade de Parcelas
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                  >
                    Juros ao Mês
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                  >
                    Valor da Parcela Mensal
                  </th>
                  <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {simulationList?.map((simulation) => (
                  <tr key={simulation.id}>
                    <td className="py-4 pr-3 pl-4 text-sm  whitespace-nowrap text-gray-700 sm:pl-0">
                      {parseDateToLocaleString(simulation.dataCriacao)}
                    </td>
                    <td className="px-3 text-right py-4 text-sm whitespace-nowrap text-gray-700">
                      {parseStringToCurrency(simulation.valorTotal)}
                    </td>
                    <td className="px-3 py-4 text-center text-sm whitespace-nowrap text-gray-700">
                      {simulation.quantidadeParcelas}
                    </td>
                    <td className="px-3 py-4 text-right text-sm whitespace-nowrap text-gray-700">
                      {parseStringToPercentage(simulation.jurosAoMes)}
                    </td>
                    <td className="px-3 py-4 text-right text-sm whitespace-nowrap text-gray-700">
                      {parseStringToCurrency(
                        simulation.valorParcelaMensal.toString()
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <nav
        aria-label="Pagination"
        className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Mostrando{" "}
            <span className="font-medium">{pagination.start + 1}</span> de{" "}
            <span className="font-medium">
              {pagination.start + currentPage}
            </span>{" "}
            de <span className="font-medium">{totalCount}</span> resultados
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <button
            disabled={pagination.start === 0}
            type="button"
            onClick={() => {
              console.log("Previous page clicked");
              setPagination((prev) => ({
                start: Math.max(prev.start - 10, 0),
                end: Math.max(prev.end - 10, 10),
              }));
            }}
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:outline-offset-0  disabled:text-gray-400"
          >
            Anterior
          </button>
          <button
            disabled={pagination.end >= totalCount}
            type="button"
            onClick={() => {
              console.log("Next page clicked");
              setPagination((prev) => ({
                start: prev.start + 10,
                end: prev.end + 10,
              }));
            }}
            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:outline-offset-0 disabled:text-gray-400"
          >
            Próximo
          </button>
        </div>
      </nav>
    </div>
  );
}
