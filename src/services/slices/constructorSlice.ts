import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientWithCount } from "../../utils/types";

type ConstructorState = {
  bun: IngredientWithCount | null;
  items: IngredientWithCount[]; 
};

const initialState: ConstructorState = {
  bun: null,
  items: [],
};

const constructorSlice = createSlice({
  name: "constructor",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<IngredientWithCount>) => {
      const ingredient = action.payload;
      if (ingredient.type === "bun") {
        state.bun = ingredient;
      } else {
        state.items.push(ingredient);
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.items.splice(action.payload, 1);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.items = [];
    },
  },
});

export const { addIngredient, removeIngredient, clearConstructor } =
  constructorSlice.actions;
export default constructorSlice.reducer;