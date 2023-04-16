import { LocationAPI } from '../../models/states/Location';
import { Store } from '../../models/states/Store';
import { emptySplitApi } from './api';
import { extendedApi as catApi } from '../LUDU_API/categories';
import store from '../../store';

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
        url: `/location/59000`,
      }),
      transformResponse: (response: Array<LocationAPI>, meta, arg) => {
        const { entity, filteredCategories } = arg;
        const res = [];
        const allCatSelector = catApi.endpoints.getAllCategories.select();
        const allCat = allCatSelector(store.getState());
        const allCatObj = {};
        allCat.data?.forEach((cat) => (allCatObj[cat._id] = cat.name));
        if (entity == 'copies') {
          for (const location of response) {
            for (const store of location['stores']) {
              for (const copy of store['copies']) {
                const gameAlreadyInResponse = res.some((el) => el.id === copy.game[0]._id);
                let gameHasCat = filteredCategories.length == 0;
                if (copy.game[0].categories.length) {
                  copy.game[0].categories.map((c) => allCatObj[c]);
                }
                for (const cat of filteredCategories) {
                  if (copy.game[0].categories.includes(cat)) {
                    gameHasCat = true;
                  }
                }
                if (!gameAlreadyInResponse && gameHasCat) {
                  res.push({ id: copy.game[0]._id });
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
