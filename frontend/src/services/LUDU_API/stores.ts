import { emptySplitApi } from './api'

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createStore: builder.mutation({
        query: storeToCreate => ({
            url: '/store',
            method: 'POST',
            body: storeToCreate
        })
    }),
    getAllStores: builder.query({
        query: () => ({
            url: '/store',
        })
    }),
    getStoreById: builder.query({
        query: storeId => ({
            url: `/store/${storeId}`,
        })
    }),
    updateStore: builder.mutation({
        query: storeToUpdate => ({
            url: `/store/${storeToUpdate.id}`,
            method: 'PUT',
            body: storeToUpdate
        })
    }),
    deleteStore: builder.mutation({
        query: storeToDeleteId => ({
            url: `/store/${storeToDeleteId}`,
            method: 'DELETE'
        })
    }),
  }),
  overrideExisting: false,
})

export const { 
    useCreateStoreMutation, 
    useUpdateStoreMutation, 
    useDeleteStoreMutation, 
    useGetAllStoresQuery, 
    useGetStoreByIdQuery 
} = extendedApi