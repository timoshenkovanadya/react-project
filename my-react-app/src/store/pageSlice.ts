import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Animal } from "../api/api.types";

export interface PageState {
  cards: Animal[];
  maxPage: string;
}

const initialState: PageState = {
  cards: [],
  maxPage: "1",
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
  },
});

// Action creators are generated for each case reducer function
export const { setNewPageCards, setMaxPage } = pageSlice.actions;

export default pageSlice.reducer;
