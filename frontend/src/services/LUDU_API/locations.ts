import { LocationAPI } from '../../models/states/Location';
import { emptySplitApi } from './api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createLocation: builder.mutation<
      LocationAPI,
      { name: string; postalCode: number }
    >({
      query: (locationToCreate) => ({
        url: '/location',
        method: 'POST',
        body: locationToCreate,
      }),
    }),
    getAllLocations: builder.query<LocationAPI[], void>({
      query: () => ({
        url: '/location',
      }),
    }),
    getLocationByZipCode: builder.query<LocationAPI, { postalCode: number }>({
      query: (location) => ({
        url: `/location/${location.postalCode}`,
      }),
    }),
    getLocationById: builder.query<LocationAPI, { _id: string }>({
      query: (location) => ({
        url: `/location/${location._id}`,
      }),
    }),
    updateLocation: builder.mutation<LocationAPI, LocationAPI>({
      query: (locationToUpdate) => ({
        url: `/location/${locationToUpdate._id}`,
        method: 'PUT',
        body: locationToUpdate,
      }),
    }),
    deleteLocation: builder.mutation<LocationAPI, { _id: string }>({
      query: (locationToDelete) => ({
        url: `/location/${locationToDelete._id}`,
        method: 'DELETE',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
  useGetAllLocationsQuery,
  useGetLocationByIdQuery,
  useGetLocationByZipCodeQuery,
} = extendedApi;
