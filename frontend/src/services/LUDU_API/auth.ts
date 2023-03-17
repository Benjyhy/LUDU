import { UserLoged, LoginPayload, UserCreate } from '../../models/states/User';
import { emptySplitApi } from './api';

export const extendedApi = emptySplitApi.injectEndpoints({
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
    refresh: builder.mutation({
      query: (token) => ({
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken: token },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation, useRefreshMutation } = extendedApi;
