import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/IngredientsSlice";
import constructorReducer from "./slices/constructorSlice";
import currentIngredientReducer from "./slices/currentIngredientSlice";
import orderReducer from "./slices/orderSlice";
import authReducer from "./slices/authSlice";
import resetPasswordReducer from './slices/resetPasswordSlice'
import ordersReducer from './slices/ordersSlice'

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  orders: ordersReducer,
  auth: authReducer,
  resetPassword: resetPasswordReducer
});

export type RootState = ReturnType<typeof rootReducer>;