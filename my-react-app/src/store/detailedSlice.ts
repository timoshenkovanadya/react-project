import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Animal } from "../api/api.types";

export interface DetailedState {
  card: Animal | null;
}

const initialState: DetailedState = {
  card: null,
};

export const detailedSlice = createSlice({
  name: "detailedSlice",
  initialState,
  reducers: {
    setNewDetailed: (state, action: PayloadAction<Animal>) => {
      state.card = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setNewDetailed } = detailedSlice.actions;

export default detailedSlice.reducer;
