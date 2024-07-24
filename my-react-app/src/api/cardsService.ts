import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetCardsArgType, ResponseDeatailedType, ResponseType } from "./api.types";

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
    }),
    getDetailed: builder.query<ResponseDeatailedType, string>({
      query: (detailedId) => `animal?uid=${detailedId}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
