import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    startOrder: (state) => {
      state.loading = true;
      state.error = null;
    },
    orderSuccess: (state, action: PayloadAction<number>) => {
      state.loading = false;
      state.orderNumber = action.payload;
    },
    orderError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearOrder: (state) => {
      state.orderNumber = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const { startOrder, orderSuccess, orderError, clearOrder } =
  orderSlice.actions;
export default orderSlice.reducer;