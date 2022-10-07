import {
  CastMember,
  CastMemberParams,
  Result,
  Results,
} from "../../types/CastMembers";
import { apiSlice } from "../api/apiSlice";

const endpointUrl: string = "/cast_members";

export const initialState: CastMember = {
  id: "",
  name: "",
  type: 1,
  created_at: "",
  updated_at: "",
  deleted_at: null,
};

function parseQueryParams(params: CastMemberParams) {
  const query = new URLSearchParams();

  if (params.page) {
    query.append("page", params.page.toString());
  }

  if (params.perPage) {
    query.append("per_page", params.perPage.toString());
  }

  if (params.search) {
    // Api foi construída passando o parâmetro filter e não search
    // Se mudar precisa alterar aqui
    query.append("filter", params.search.toString());
  }

  if (params.type) {
    query.append("type", params.type.toString());
  }

  return query.toString();
}

function getCastMember({ id }: { id: string }) {
  return {
    method: "GET",
    url: `${endpointUrl}/${id}`,
  };
}

function getCastMembers(params: CastMemberParams) {
  const { page = 1, perPage = 10, search, type } = params;
  return `${endpointUrl}?${parseQueryParams({
    page,
    perPage,
    search,
    type,
  })})}`;
}

function createCastMember(castMember: CastMember) {
  return {
    url: endpointUrl,
    method: "POST",
    body: castMember,
  };
}

function updateCastMember(castMember: CastMember) {
  return {
    method: "PUT",
    url: `${endpointUrl}/${castMember.id}`,
    body: castMember,
  };
}

function deleteCastMember({ id }: { id: string }) {
  return {
    method: "DELETE",
    url: `${endpointUrl}/${id}`,
  };
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getCastMember: query<Result, { id: string }>({
      query: getCastMember,
      providesTags: ["CastMembers"],
    }),
    getCastMembers: query<Results, CastMemberParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"],
    }),
    createCastMember: mutation<Result, CastMember>({
      query: createCastMember,
      invalidatesTags: ["CastMembers"],
    }),
    updateCastMember: mutation<Result, CastMember>({
      query: updateCastMember,
      invalidatesTags: ["CastMembers"],
    }),
    deleteCastMember: mutation<Result, { id: string }>({
      query: deleteCastMember,
      invalidatesTags: ["CastMembers"],
    }),
  }),
});

export const {
  useGetCastMemberQuery,
  useGetCastMembersQuery,
  useCreateCastMemberMutation,
  useUpdateCastMemberMutation,
  useDeleteCastMemberMutation,
} = castMembersApiSlice;
