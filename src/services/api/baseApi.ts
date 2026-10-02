import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/store';
import { environment } from '@/config/environment';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: environment.apiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.session?.access_token;

      headers.set('Accept', 'application/json');

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: () => ({}),
});
