import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://13.39.77.202' }),
  endpoints: () => ({}),
});
