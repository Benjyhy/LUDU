import { emptySplitApi } from './api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createCopy: builder.mutation({
      query: (copyToCreate) => ({
        url: '/copy',
        method: 'POST',
        body: copyToCreate,
      }),
    }),
    getAllCopies: builder.query({
      query: () => ({
        url: '/copy',
      }),
    }),
    getCopyById: builder.query({
      query: (copyId) => ({
        url: `/copy/${copyId}`,
      }),
    }),
    updateCopy: builder.mutation({
      query: (copyToUpdate) => ({
        url: `/copy/${copyToUpdate.id}`,
        method: 'PUT',
        body: copyToUpdate,
      }),
    }),
    deleteCopy: builder.mutation({
      query: (copyToDeleteId) => ({
        url: `/copy/${copyToDeleteId}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCopyMutation,
  useUpdateCopyMutation,
  useDeleteCopyMutation,
  useGetAllCopiesQuery,
  useGetCopyByIdQuery,
} = extendedApi;
