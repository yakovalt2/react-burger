import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { request } from "../../utils/request"; 

type OrderState = {
  orderNumber: number | null;
  loading: boolean;
  error: string | null;
};

export const initialState: OrderState = {
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
    const data = await request<{ success: boolean; order: { number: number } }>("orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients: ingredientIds }),
    });

    return data.order.number;
  } catch (err) {
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