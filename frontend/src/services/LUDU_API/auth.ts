import { emptySplitApi } from './api'

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
        query: userToSubscribe => ({
            url: '/local/register',
            method: 'POST',
            body: userToSubscribe
        })
    }),
    login: builder.query({
        query: userToLogin => ({
            url: '/local/login',
            method: 'POST',
            body: userToLogin
        })
    }),
  }),
  overrideExisting: false,
})

export const { useRegisterMutation, useLoginQuery } = extendedApi