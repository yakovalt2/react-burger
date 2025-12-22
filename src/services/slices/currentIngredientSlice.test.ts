import reducer, {
  setCurrentIngredient,
  clearCurrentIngredient,
  initialState,
} from "./currentIngredientSlice";
import { IngredientWithCount } from "../../utils/types";

// Константа для тестов
const INGREDIENT: IngredientWithCount = {
  _id: "1",
  name: "Lettuce",
  type: "main",
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  calories: 0,
  price: 10,
  image: "",
  image_mobile: "",
  image_large: "",
  count: 0,
};

describe("currentIngredientSlice", () => {
  it("должен возвращать initialState по умолчанию", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("должен устанавливать текущий ингредиент", () => {
    const state = reducer(initialState, setCurrentIngredient(INGREDIENT));
    expect(state.current).toEqual(INGREDIENT);
  });

  it("должен очищать текущий ингредиент", () => {
    const stateWithIngredient = { current: INGREDIENT };
    const state = reducer(stateWithIngredient, clearCurrentIngredient());
    expect(state.current).toBeNull();
  });
});
