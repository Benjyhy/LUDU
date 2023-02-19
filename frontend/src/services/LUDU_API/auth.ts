import { UserDto, LoginPayload, UserCreate } from '../../models/states/User';
import { emptySplitApi } from './api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<UserDto, UserCreate>({
      query: (userToSubscribe) => ({
        url: '/local/register',
        method: 'POST',
        body: userToSubscribe,
      }),
    }),
    login: builder.mutation<UserDto, LoginPayload>({
      query: (userToLogin) => ({
        url: '/local/login',
        method: 'POST',
        body: userToLogin,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useRegisterMutation, useLoginMutation } = extendedApi;
