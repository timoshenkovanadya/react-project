import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Animal } from "../api/api.types";

export interface PageState {
  cards: Animal[];
}

const initialState: PageState = {
  cards: [],
};

export const pageSlice = createSlice({
  name: "pageSlice",
  initialState,
  reducers: {
    setNewPageCards: (state, action: PayloadAction<Animal[]>) => {
      state.cards = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewPageCards } = pageSlice.actions;

export default pageSlice.reducer;
