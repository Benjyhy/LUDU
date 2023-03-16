import { LocationAPI } from '../../models/states/Location';
import { emptySplitApi } from './api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createLocation: builder.mutation<LocationAPI, { name: string; postalCode: number }>({
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
    // getLocationByZipCode: builder.query<LocationAPI, { postalCode: number }>({
    //   query: (location) => ({
    //     url: `/location/${location.postalCode}`,
    //   }),
    // }),
    getCopiesByZipCode: builder.query<Array<string>, { postalCode: number }>({
      query: (location) => ({
        url: `/location/${location.postalCode}`,
      }),
      transformResponse: (response: Array<LocationAPI>): Array<string> => {
        const copies = [];
        for (const location of response) {
          for (const store of location['stores']) {
            for (const copy of store['copies']) {
              copies.push(copy);
            }
          }
        }
        return copies;
      },
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
  useGetCopiesByZipCodeQuery,
} = extendedApi;
