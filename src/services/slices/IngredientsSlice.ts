import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IngredientWithCount } from '../../utils/types';
import { API_URL } from '../../utils/constants';
import { testData } from '../../utils/data';

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
    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }
    const data = await res.json();
    return data.data as IngredientWithCount[];
  } catch (err: any) {
    console.error('Ошибка при загрузке ингредиентов:', err);
    return rejectWithValue('Ошибка загрузки ингредиентов');
  }
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchIngredients.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.length ? action.payload : testData;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Ошибка при загрузке ингредиентов';
        state.items = testData;
      });
  },
});

export default ingredientsSlice.reducer;