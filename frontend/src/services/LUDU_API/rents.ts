import { CreateRentPayload, Rent } from '../../models/states/Rent';
import { emptySplitApi } from './api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createRent: builder.mutation<Rent, CreateRentPayload>({
      query: (rentToCreate) => ({
        url: '/rent',
        method: 'POST',
        body: rentToCreate,
      }),
    }),
    getAllRents: builder.query<Rent[], void>({
      query: () => ({
        url: '/rent',
      }),
    }),
    getRentById: builder.query<Rent, { _id: string }>({
      query: (rent) => ({
        url: `/rent/${rent._id}`,
      }),
    }),
    setRentToDone: builder.query<Rent, { _id: string }>({
      query: (rent) => ({
        url: `/rent/done/${rent._id}`,
      }),
    }),
    setRentToDelivered: builder.query<Rent, { _id: string }>({
      query: (rent) => ({
        url: `/rent/delivered/${rent._id}`,
      }),
    }),
    deleteRent: builder.mutation<Rent, { _id: string }>({
      query: (rentToDelete) => ({
        url: `/rent/${rentToDelete._id}`,
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
