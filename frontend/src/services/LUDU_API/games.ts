import { emptySplitApi } from './api'

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createGame: builder.mutation({
        query: gameToCreate => ({
            url: '/game',
            method: 'POST',
            body: gameToCreate
        })
    }),
    getAllGames: builder.query({
        query: () => ({
            url: '/game',
        })
    }),
    getGameById: builder.query({
        query: gameId => ({
            url: `/game/${gameId}`,
        })
    }),
    updateGame: builder.mutation({
        query: gameToUpdate => ({
            url: `/game/${gameToUpdate.id}`,
            method: 'PUT',
            body: gameToUpdate
        })
    }),
    deleteGame: builder.mutation({
        query: gameToDeleteId => ({
            url: `/copy/${gameToDeleteId}`,
            method: 'DELETE'
        })
    }),
  }),
  overrideExisting: false,
})

export const { 
    useCreateGameMutation, 
    useUpdateGameMutation, 
    useDeleteGameMutation, 
    useGetAllGamesQuery, 
    useGetGameByIdQuery 
} = extendedApi