import { CategoryParams, Result, Results } from "../../types/Category";
import { apiSlice } from "../api/apiSlice";

export interface Category {
  id: string;
  name: string;
  description: null | string;
  is_active: boolean;
  created_at: string;
  // updated_at: string;
  // deleted_at: null | string;
}

const endpointUrl: string = "/categories";

function parseQueryParams(params: CategoryParams) {
  const query = new URLSearchParams();

  if (params.page) {
    query.append("page", params.page.toString());
  }

  if (params.perPage) {
    query.append("total_page", params.perPage.toString());
  }

  if (params.search) {
    // Api foi construída passando o parâmetro filter e não search
    // Se mudar precisa alterar aqui
    query.append("filter", params.search.toString());
  }

  if (params.isActive) {
    query.append("is_active", params.isActive.toString());
  }

  return query.toString();
}

function getCategories({ page = 1, perPage = 10, search = "" }) {
  const params = { page, perPage, search, isActive: true };
  return `${endpointUrl}?${parseQueryParams(params)}`;
}

function createCategoryMutation(category: Category) {
  return {
    url: endpointUrl,
    method: "POST",
    body: category,
  };
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "PUT",
    body: category,
  };
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endpointUrl}/${category.id}`,
    method: "DELETE",
  };
}

function getCategoryQuery({ id }: { id: string }) {
  return {
    url: `${endpointUrl}/${id}`,
  };
}

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCategories: query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ["Categories"],
    }),
    getCategory: query<Result, { id: string }>({
      query: getCategoryQuery,
      providesTags: ["Categories"],
    }),
    createCategory: mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    updateCategory: mutation<Result, Category>({
      query: updateCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
    deleteCategories: mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoriesMutation,
} = categoriesApiSlice;
