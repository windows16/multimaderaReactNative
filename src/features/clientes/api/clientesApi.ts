import type { ClientesResponse } from '@/features/models/types';
import { baseApi } from '@/services/api/baseApi';

export const clientesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClientes: builder.query<
      ClientesResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/clientes',
        params: { page, limit },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetClientesQuery } = clientesApi;
