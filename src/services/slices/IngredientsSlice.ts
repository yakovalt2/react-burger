import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IngredientWithCount } from '../../utils/types';
import { API_URL } from '../../utils/constants';
import { testData } from '../../utils/data';
import { checkResponse } from '../../utils/checkResponse';

export interface IngredientsState {
  items: IngredientWithCount[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IngredientsState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchIngredients = createAsyncThunk<
  IngredientWithCount[],
  void,
  { rejectValue: string }
>('ingredients/fetchIngredients', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_URL}/ingredients`);
    const data = await checkResponse<{ data: IngredientWithCount[] }>(res);

    const items = (data.data as IngredientWithCount[]).map(i => ({ ...i, count: i.count ?? 0 }));
    return items;
  } catch (err: any) {
    console.error('Ошибка при загрузке ингредиентов:', err);
    return testData.map(i => ({ ...i, count: 0 }));
  }
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    incrementCount: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.items.find(i => i._id === id);
      if (item) item.count = (item.count ?? 0) + 1;
    },
    decrementCount: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const item = state.items.find(i => i._id === id);
      if (item) item.count = Math.max((item.count ?? 0) - 1, 0);
    },
    resetCounts: (state) => {
      state.items.forEach(i => (i.count = 0));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchIngredients.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.length ? action.payload : testData.map(i => ({ ...i, count: 0 }));
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка при загрузке ингредиентов';
        state.items = testData.map(i => ({ ...i, count: 0 }));
      });
  },
});

export const { incrementCount, decrementCount, resetCounts } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;