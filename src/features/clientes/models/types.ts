export interface Cliente {
  nombre: string;
  telefono: string;
  idTipoCliente: number | null;
  numeroDeCliente: number | null;
  tipoCliente?: string | null;
}

export interface ClientesResponse {
  data: Cliente[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
