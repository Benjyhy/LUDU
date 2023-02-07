import { emptySplitApi } from './api'

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createLocation: builder.mutation({
        query: locationToCreate => ({
            url: '/location',
            method: 'POST',
            body: locationToCreate
        })
    }),
    getAllLocations: builder.query({
        query: () => ({
            url: '/location',
        })
    }),
    getLocationByZipCode: builder.query({
        query: zipCode => ({
            url: `/location/${zipCode}`,
        })
    }),
    getLocationById: builder.query({
        query: locationId => ({
            url: `/location/${locationId}`,
        })
    }),
    updateLocation: builder.mutation({
        query: locationToUpdate => ({
            url: `/location/${locationToUpdate.id}`,
            method: 'PUT',
            body: locationToUpdate
        })
    }),
    deleteLocation: builder.mutation({
        query: locationToDeleteId => ({
            url: `/location/${locationToDeleteId}`,
            method: 'DELETE'
        })
    }),
  }),
  overrideExisting: false,
})

export const { 
    useCreateLocationMutation, 
    useUpdateLocationMutation, 
    useDeleteLocationMutation, 
    useGetAllLocationsQuery, 
    useGetLocationByIdQuery,
    useGetLocationByZipCodeQuery,
} = extendedApi