import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/IngredientsSlice";
import constructorReducer from "./slices/constructorSlice";
import currentIngredientReducer from "./slices/currentIngredientSlice";
import orderReducer from "./slices/orderSlice";
import authReducer from "./slices/authSlice";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;