import { LocationAPI } from '../../models/states/Location';
import { Store } from '../../models/states/Store';
import { emptySplitApi } from './api';
import { allCat } from '../../utils/categories';

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
    getEntitiesByZipCode: builder.query<
      EntityByZipCode,
      { postalCode: number; entity: string; filteredCategories: [] }
    >({
      query: (location) => ({
        // url: `/location/${location}`,
        url: `/location/59000`,
      }),
      transformResponse: (response: Array<LocationAPI>, meta, arg) => {
        const { entity, filteredCategories } = arg;
        const res = [];
        if (entity == 'copies') {
          for (const location of response) {
            for (const store of location['stores']) {
              for (const copy of store['copies']) {
                const gameAlreadyInResponse = res.some((el) => el.id === copy.game[0]._id);
                if (filteredCategories.length > 0) {
                  for (const cat of filteredCategories) {
                    if (copy.game[0].categories.includes(allCat[cat])) {
                      if (!gameAlreadyInResponse) res.push({ id: copy.game[0]._id });
                    }
                  }
                } else {
                  if (!gameAlreadyInResponse) res.push({ id: copy.game[0]._id });
                }
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
