import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
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
  type: 0,
  createdAt: "",
  updatedAt: "",
  deletedAt: null,
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

function getCastMembers(params: CastMemberParams) {
  const { page = 1, perPage = 10, search, type } = params;
  return `${endpointUrl}?${parseQueryParams({
    page,
    perPage,
    search,
    type,
  })})}`;
}

export const castMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query }) => ({
    getCastMembers: query<Result, CastMemberParams>({
      query: getCastMembers,
      providesTags: ["CastMembers"],
    }),
  }),
});

export const { useGetCastMembersQuery } = castMembersApiSlice;
