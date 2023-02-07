import { emptySplitApi } from './api'

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
        query: () => ({
            url: '/user',
        })
    }),
    getUserById: builder.query({
        query: userId => ({
            url: `/user/${userId}`,
        })
    }),
    updateUser: builder.mutation({
        query: userToUpdate => ({
            url: `/user/${userToUpdate.id}`,
            method: 'PUT',
            body: userToUpdate
        })
    }),
    deleteGame: builder.mutation({
        query: userToDelete => ({
            url: `/user/${userToDelete}`,
            method: 'DELETE'
        })
    }),
  }),
  overrideExisting: false,
})

export const { 
    useUpdateUserMutation, 
    useDeleteUserMutation, 
    useGetAllUsersQuery, 
    useGetUserByIdQuery 
} = extendedApi