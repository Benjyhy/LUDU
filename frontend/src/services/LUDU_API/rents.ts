import { CreateRentPayload, Rent } from '../../models/states/Rent';
import { emptySplitApi } from './api';
import { QueryApi } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { useGetCopyByIdQuery } from './copies';
import { Copy } from '../../models/states/Copy';

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
        url: `/rent/user/${rent._id}`,
      }),
    }),
    getUserRents: builder.query<any, { _id: string; done: any; is_delivered: any }>({
      query: (args) => {
        const { _id, done, is_delivered } = args;
        return {
          url: `/rent/user/${_id}`,
          params: {
            done,
            is_delivered,
          },
        };
      },
      transformResponse: (response: any) => {
        return response.map(async (rent) => {
          const newRent = { ...rent };
          const copy = useGetCopyByIdQuery({ _id: newRent.game });
          console.log(copy);
          newRent.game = copy;
          return newRent;
        });
      },
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
  useGetUserRentsQuery,
  useSetRentToDoneQuery,
  useSetRentToDeliveredQuery,
} = extendedApi;
