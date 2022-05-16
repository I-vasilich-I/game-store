import { API, API_BASE } from "@/constants";
import { IGame, IParams } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { topGamesURL, searchRequestURL, gamesURL, editProduct } = API;

// Define a service using a base URL and expected endpoints
// eslint-disable-next-line import/prefer-default-export
export const apiSlice = createApi({
  reducerPath: "API",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  tagTypes: ["GAMES", "TOP_GAMES", "SEARCH_GAMES"],
  endpoints: (builder) => ({
    getTopGames: builder.query<IGame[], null>({
      query: () => topGamesURL,
      providesTags: ["TOP_GAMES"],
    }),
    getGames: builder.query<IGame[], IParams>({
      query: (filter) => ({ url: gamesURL, params: filter }),
      providesTags: ["GAMES"],
    }),
    searchGames: builder.query<IGame[], string>({
      query: (search) => `${searchRequestURL}${search}`,
      providesTags: ["SEARCH_GAMES"],
    }),
    updateGame: builder.mutation<string, IGame | null>({
      query: (game) => ({
        url: editProduct,
        method: "PUT",
        body: game,
      }),
      invalidatesTags: ["GAMES", "TOP_GAMES"],
    }),
  }),
});

export const { useGetTopGamesQuery, useGetGamesQuery, useSearchGamesQuery, useUpdateGameMutation } = apiSlice;
