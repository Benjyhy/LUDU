import { UserLoged, UserUpdate, User } from './../../models/states/User';
import { emptySplitApi } from './api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => ({
        url: '/user',
      }),
    }),
    getUserById: builder.query<User, { id: string }>({
      query: (user) => ({
        url: `/user/${user.id}`,
      }),
    }),
    updateUser: builder.mutation<UserLoged, UserUpdate>({
      query: (userToUpdate) => ({
        url: `/user/${userToUpdate.id}`,
        method: 'PUT',
        body: userToUpdate,
      }),
    }),
    deleteUser: builder.mutation<User, { id: string }>({
      query: (userToDelete) => ({
        url: `/user/${userToDelete.id}`,
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
