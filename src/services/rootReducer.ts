import { combineReducers } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/IngredientsSlice";
import constructorReducer from "./slices/constructorSlice";
import currentIngredientReducer from "./slices/currentIngredientSlice";
import orderReducer from "./slices/orderSlice";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  currentIngredient: currentIngredientReducer,
  order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;