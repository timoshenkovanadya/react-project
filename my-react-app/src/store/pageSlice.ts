import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Animal } from "../api/api.types";

export interface PageState {
  cards: Animal[];
  maxPage: string;
  isFetching: boolean;
}

const initialState: PageState = {
  cards: [],
  maxPage: "1",
  isFetching: false,
};

export const pageSlice = createSlice({
  name: "pageSlice",
  initialState,
  reducers: {
    setNewPageCards: (state, action: PayloadAction<Animal[]>) => {
      state.cards = action.payload;
    },
    setMaxPage: (state, action: PayloadAction<string>) => {
      state.maxPage = action.payload;
    },
    toggleIsFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewPageCards, setMaxPage, toggleIsFetching } =
  pageSlice.actions;

export default pageSlice.reducer;
