import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import * as SecureStore from 'expo-secure-store';
import { LoginPayload, UserCreate, UserLoged } from '../../models/states/User';

export const emptySplitApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
    prepareHeaders: async (headers, { getState }) => {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      // const refreshToken = await SecureStore.getItemAsync('accessToken');
      // const isRefreshEndpoint = getState().api.endpoints.some(
      //   (endpoint) => endpoint.name === 'refresh' && endpoint.method === 'GET',
      // );
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      // if (refreshToken && isRefreshEndpoint) {
      //   headers.set('Authorization', `Bearer ${refreshToken}`);
      // }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<UserLoged, UserCreate>({
      query: (userToSubscribe) => ({
        url: '/local/register',
        method: 'POST',
        body: userToSubscribe,
      }),
    }),
    login: builder.mutation<UserLoged, LoginPayload>({
      query: (userToLogin) => ({
        url: '/local/login',
        method: 'POST',
        body: userToLogin,
      }),
    }),
    refresh: builder.query({
      query: () => ({
        url: '/local/refresh',
        method: 'GET',
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: '/local/logout',
        method: 'GET',
      }),
    }),
  }),
});
