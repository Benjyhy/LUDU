import { LocationAPI } from '../../models/states/Location';
import { Store } from '../../models/states/Store';
import { emptySplitApi } from './api';

type EntityByZipCode = Array<string> | Array<Store>;

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
    getEntitiesByZipCode: builder.query<EntityByZipCode, { postalCode: number; entity: string }>({
      query: (location) => ({
        url: `/location/${location.postalCode}`,
      }),
      transformResponse: (response: Array<LocationAPI>, meta, arg) => {
        const { entity } = arg;
        const res = [];
        if (entity == 'copies') {
          for (const location of response) {
            for (const store of location['stores']) {
              for (const copy of store['copies']) {
                res.push(copy._id);
              }
            }
          }
        } else {
          for (const location of response) {
            for (const store of location['stores']) {
              res.push(store);
            }
          }
        }
        return res;
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
  useGetEntitiesByZipCodeQuery,
} = extendedApi;
