import { User } from '../../models/states/User';
import { emptySplitApi } from './api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: '/user',
      }),
    }),
    getUserById: builder.query<User, { _id: string }>({
      query: (user) => ({
        url: `/user/${user._id}`,
      }),
    }),
    updateUser: builder.mutation<User, User>({
      query: (userToUpdate) => ({
        url: `/user/${userToUpdate._id}`,
        method: 'PUT',
        body: userToUpdate,
      }),
    }),
    deleteUser: builder.mutation<User, { _id: string }>({
      query: (userToDelete) => ({
        url: `/user/${userToDelete._id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
} = extendedApi;
