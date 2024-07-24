import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  GetCardsArgType,
  ResponseDeatailedType,
  ResponseType,
} from "./api.types";
import {
  setMaxPage,
  setNewPageCards,
  toggleIsFetching,
} from "../store/pageSlice";
import { setNewDetailed } from "../store/detailedSlice";

export const cardsService = createApi({
  reducerPath: "cardsService",
  baseQuery: fetchBaseQuery({ baseUrl: "https://stapi.co/api/v1/rest/" }),
  endpoints: (builder) => ({
    getCards: builder.mutation<ResponseType, GetCardsArgType>({
      query: ({ name, page }) => ({
        url: `animal/search?pageNumber=${Number(page) - 1}&pageSize=10`,
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: { name },
      }),

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(toggleIsFetching(true));
        const resp = await queryFulfilled;
        dispatch(toggleIsFetching(false));
        if ("data" in resp) {
          dispatch(setNewPageCards(resp.data?.animals));
          dispatch(setMaxPage(resp.data?.page?.totalPages?.toString()));
        }
      },
    }),
    getDetailed: builder.query<ResponseDeatailedType, string>({
      query: (detailedId) => `animal?uid=${detailedId}`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const resp = await queryFulfilled;
        if ("data" in resp) {
          dispatch(setNewDetailed(resp.data.animal));
        }
      },
    }),
  }),
});
