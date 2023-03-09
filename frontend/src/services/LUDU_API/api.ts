import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://13.39.77.202' }),
  // baseQuery: fetchBaseQuery({ baseUrl: `http://192.168.101.58:3000` }),
  endpoints: () => ({}),
});
