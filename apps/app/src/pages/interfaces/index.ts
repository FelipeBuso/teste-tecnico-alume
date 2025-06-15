export interface ISimulation {
  id: number;
  estudanteId: number;
  valorTotal: string;
  quantidadeParcelas: number;
  jurosAoMes: string;
  dataCriacao: Date;
  dataAtualizacao: Date;
  valorParcelaMensal: number;
}
