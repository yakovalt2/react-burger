import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { TOrder, TIngredient } from "../../utils/types";

export const wsGetMessage = createAction<{
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
}>("WS_GET_MESSAGE");

interface OrdersState {
  orders: (TOrder & { ingredientsData: TIngredient[]; totalPrice: number })[];
  total: number;
  totalToday: number;
}

const initialState: OrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (
      state,
      action: PayloadAction<{
        orders: TOrder[];
        total: number;
        totalToday: number;
        allIngredients: TIngredient[];
      }>
    ) => {
      state.orders = action.payload.orders.map((order) => {
        const ingredientsData = order.ingredients
          .map((id) => action.payload.allIngredients.find((i) => i._id === id))
          .filter(Boolean) as TIngredient[];
        const totalPrice = ingredientsData.reduce((sum, i) => sum + i.price, 0);
        return { ...order, ingredientsData, totalPrice };
      });
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(wsGetMessage, (state, action) => {
      if (action.payload.success) {
        state.orders = action.payload.orders.map(order => ({
          ...order,
          ingredientsData: [], 
          totalPrice: 0,
        }));
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      }
    });
  },
});

export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
