export interface ISimulation {
  id: number;
  estudanteId: number;
  valorTotal: number;
  quantidadeParcelas: number;
  jurosAoMes: number;
  dataCriacao: Date;
  dataAtualizacao: Date;
  valorParcelaMensal: number;
}
