import { emptySplitApi } from './api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createRent: builder.mutation({
      query: (rentToCreate) => ({
        url: '/rent',
        method: 'POST',
        body: rentToCreate,
      }),
    }),
    getAllRents: builder.query({
      query: () => ({
        url: '/rent',
      }),
    }),
    getRentById: builder.query({
      query: (rentId) => ({
        url: `/rent/${rentId}`,
      }),
    }),
    setRentToDone: builder.query({
      query: (rentId) => ({
        url: `/rent/done/${rentId}`,
      }),
    }),
    setRentToDelivered: builder.query({
      query: (rentId) => ({
        url: `/rent/delivered/${rentId}`,
      }),
    }),
    deleteRent: builder.mutation({
      query: (rentToDeleteId) => ({
        url: `/rent/${rentToDeleteId}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateRentMutation,
  useDeleteRentMutation,
  useGetAllRentsQuery,
  useGetRentByIdQuery,
  useSetRentToDoneQuery,
  useSetRentToDeliveredQuery,
} = extendedApi;
