import { emptySplitApi } from './api';

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (categoryToCreate) => ({
        url: '/category',
        method: 'POST',
        body: categoryToCreate,
      }),
    }),
    updateCategory: builder.mutation({
      query: (categoryToUpdate) => ({
        url: `/category/${categoryToUpdate.id}`,
        method: 'PUT',
        body: categoryToUpdate,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (categoryToDeleteId) => ({
        url: `/category/${categoryToDeleteId}`,
        method: 'DELETE',
      }),
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: '/category',
      }),
    }),
    getCategoryById: builder.query({
      query: (cateogryId) => ({
        url: `/category/${cateogryId}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
} = extendedApi;
