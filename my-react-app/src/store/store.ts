import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import detailedReducer from ".//detailedSlice";

export const store = configureStore({
  reducer: { page: pageReducer, detailed: detailedReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
