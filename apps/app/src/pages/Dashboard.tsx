import { useEffect, useState } from "react";
import { apiAxios } from "../services/api";

import {
  parseDateToLocaleString,
  parseStringToCurrency,
  parseStringToPercentage,
} from "../utils/parse";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import type { ISimulation } from "./interfaces";

export default function Dashboard() {
  const [simulations, setSimulations] = useState<ISimulation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const api = apiAxios();
      const url = import.meta.env.VITE_API_URL;

      const res = await api.get(`${url}/simulations?start=0&end=100`);
      setSimulations(res.data);
    };

    fetchData();
  }, []);

  const lastFive = simulations.slice(0, 5);
  const total = simulations.length;
  const mediaParcela = (
    simulations.reduce((acc, cur) => acc + Number(cur.valorParcelaMensal), 0) /
      total || 0
  ).toFixed(2);

  return (
    <div className="p-4 space-y-8">
      {/* Cards totalizadores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card title="Total de Simulações" value={total} />
        <Card
          title="Parcela Média"
          value={parseStringToCurrency(mediaParcela)}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Evolução das Simulações</h2>
        <div className="h-80 bg-white p-4 rounded shadow">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={[...simulations].reverse()}>
              <defs>
                <linearGradient id="colorParcela" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="dataCriacao"
                tickFormatter={(d) => parseDateToLocaleString(d).slice(0, 10)}
              />
              <YAxis
                label={{
                  value: "Valor da Parcela (R$)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#64748b", fontSize: 12 },
                }}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip
                formatter={(v: number | string) =>
                  parseStringToCurrency(String(v))
                }
              />
              <Area
                type="monotone"
                dataKey="valorParcelaMensal"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorParcela)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Últimas 5 Simulações</h2>
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
                    <th
                      scope="col"
                      className="relative py-3.5 pr-4 pl-3 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {lastFive?.map((simulation) => (
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
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-2xl font-bold text-indigo-600">{value}</p>
    </div>
  );
}
