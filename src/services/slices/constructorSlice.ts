import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientWithCount } from "../../utils/types";

type ConstructorItem = IngredientWithCount & { uid?: string };

type ConstructorState = {
  bun: ConstructorItem | null;
  items: ConstructorItem[]; 
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
        state.bun = { ...ingredient };
      } else {
        const uid = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`;
        state.items.push({ ...ingredient, uid });
      }
    },
    removeIngredient: (state, action: PayloadAction<number | string>) => {
      const payload = action.payload;
      if (typeof payload === "number") {
        state.items.splice(payload, 1);
      } else {
        state.items = state.items.filter(i => i.uid !== payload);
      }
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= state.items.length || toIndex >= state.items.length) {
        return;
      }
      const [moved] = state.items.splice(fromIndex, 1);
      state.items.splice(toIndex, 0, moved);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.items = [];
    },
    setBun: (state, action: PayloadAction<IngredientWithCount | null>) => {
      state.bun = action.payload ? { ...action.payload } : null;
    }
  },
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  setBun,
} = constructorSlice.actions;

export default constructorSlice.reducer;