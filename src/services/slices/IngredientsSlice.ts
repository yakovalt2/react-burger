import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IngredientWithCount } from '../../utils/types';
import { request } from '../../utils/request';

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
    const data = await request<{ data: IngredientWithCount[] }>('/ingredients');

    const items = (data.data as IngredientWithCount[]).map(i => ({ ...i, count: i.count ?? 0 }));
    return items;
  } catch (err: any) {
    console.error('Ошибка при загрузке ингредиентов:', err);
    return rejectWithValue(err.message || 'Ошибка при загрузке ингредиентов');
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
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка при загрузке ингредиентов';
        state.items = [];
      });
  },
});

export const { incrementCount, decrementCount, resetCounts } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;