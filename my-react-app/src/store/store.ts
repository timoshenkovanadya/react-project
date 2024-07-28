import { configureStore, PayloadAction } from "@reduxjs/toolkit";
import pageReducer from "./pageSlice";
import detailedReducer from ".//detailedSlice";
import { cardsService } from "../api/cardsService";

import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Animal } from "../api/api.types";

const cardsAdapter = createEntityAdapter({
  selectId: (book: Animal) => book.uid,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const adapterSlice = createSlice({
  name: "adapter",
  initialState: cardsAdapter.getInitialState(),
  reducers: {
    toggleSelected(state, action: PayloadAction<Animal>) {
      const animal = action.payload;
      const id = animal.uid;
      // cardsAdapter.setAll(state, action.payload.books);
      const isChecked = !!cardsAdapter.getSelectors().selectById(state, id);
      if (isChecked) {
        cardsAdapter.removeOne(state, id);
      } else {
        cardsAdapter.addOne(state, animal);
      }
    },
    removeAllSelected: cardsAdapter.removeAll,
  },
});

export const { toggleSelected, removeAllSelected } = adapterSlice.actions;

export const adapterReducer = adapterSlice.reducer;

export const adapterSelectors = cardsAdapter.getSelectors<RootState>(
  (state) => state.adapter,
);

export const store = configureStore({
  reducer: {
    page: pageReducer,
    detailed: detailedReducer,
    adapter: adapterSlice.reducer,
    [cardsService.reducerPath]: cardsService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cardsService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
