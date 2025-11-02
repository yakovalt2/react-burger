import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "../../utils/constants";
import { IngredientWithCount } from "../../utils/types";

type OrderState = {
  orderNumber: number | null;
  loading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  orderNumber: null,
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk<
  number,
  string[],
  { rejectValue: string }
>("order/createOrder", async (ingredientIds, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientIds }),
    });
    if (!res.ok) throw new Error(`Ошибка: ${res.status}`);
    const data = await res.json();
    return data.order.number;
  } catch (err: any) {
    return rejectWithValue("Ошибка при создании заказа");
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderNumber = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderNumber = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка при создании заказа";
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;