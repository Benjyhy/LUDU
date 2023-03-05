import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://13.39.77.202',
    prepareHeaders: async (headers) => {
      const token = await SecureStore.getItemAsync('authToken');;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
