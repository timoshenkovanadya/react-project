import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import detailedReducer from ".//detailedSlice";
import { cardsService } from "../api/cardsService";

export const store = configureStore({
  reducer: {
    page: pageReducer,
    detailed: detailedReducer,
    [cardsService.reducerPath]: cardsService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cardsService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
