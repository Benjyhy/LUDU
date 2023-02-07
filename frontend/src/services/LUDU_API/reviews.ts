import { emptySplitApi } from './api'

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
        query: reviewToCreate => ({
            url: '/review',
            method: 'POST',
            body: reviewToCreate
        })
    }),
    getAllReviews: builder.query({
        query: () => ({
            url: '/review',
        })
    }),
    getReviewById: builder.query({
        query: reviewId => ({
            url: `/review/${reviewId}`,
        })
    }),
    updateReview: builder.mutation({
        query: reviewToUpdate => ({
            url: `/game/${reviewToUpdate.id}`,
            method: 'PUT',
            body: reviewToUpdate
        })
    }),
    deleteGame: builder.mutation({
        query: reviewToDeleteId => ({
            url: `/review/${reviewToDeleteId}`,
            method: 'DELETE'
        })
    }),
  }),
  overrideExisting: false,
})

export const { 
    useCreateReviewMutation, 
    useUpdateReviewMutation, 
    useDeleteReviewMutation, 
    useGetAllReviewsQuery, 
    useGetReviewByIdQuery 
} = extendedApi