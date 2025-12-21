import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientWithCount } from "../../utils/types";

type CurrentIngredientState = {
  current: IngredientWithCount | null;
};

export const initialState: CurrentIngredientState = {
  current: null,
};

const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState,
  reducers: {
    setCurrentIngredient: (state, action: PayloadAction<IngredientWithCount>) => {
      state.current = action.payload;
    },
    clearCurrentIngredient: (state) => {
      state.current = null;
    },
  },
});

export const { setCurrentIngredient, clearCurrentIngredient } =
  currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;