import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IngredientWithCount } from "../../utils/types";
import { v4 as uuidv4 } from "uuid";

type ConstructorItem = IngredientWithCount & { uid: string };

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
    addIngredient: {
      reducer: (state, action: PayloadAction<ConstructorItem>) => {
        const ingredient = action.payload;
        if (ingredient.type === "bun") {
          state.bun = { ...ingredient };
        } else {
          state.items.push(ingredient);
        }
      },
      prepare: (ingredient: IngredientWithCount) => {
        return { payload: { ...ingredient, uid: uuidv4() } };
      },
    },

    removeIngredient: (state, action: PayloadAction<number | string>) => {
      const payload = action.payload;
      if (typeof payload === "number") {
        state.items.splice(payload, 1);
      } else {
        state.items = state.items.filter((i) => i.uid !== payload);
      }
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= state.items.length ||
        toIndex >= state.items.length
      ) {
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
      state.bun = action.payload ? { ...action.payload, uid: uuidv4() } : null;
    },
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