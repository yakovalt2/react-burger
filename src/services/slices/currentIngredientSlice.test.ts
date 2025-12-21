import reducer, {
  setCurrentIngredient,
  clearCurrentIngredient,
} from "./currentIngredientSlice";
import { IngredientWithCount } from "../../utils/types";

describe("currentIngredientSlice", () => {
  const ingredient: IngredientWithCount = {
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

  it("должен возвращать начальное состояние по умолчанию", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual({
      current: null,
    });
  });

  it("должен устанавливать текущий ингредиент", () => {
    const state = reducer(undefined, setCurrentIngredient(ingredient));
    expect(state.current).toEqual(ingredient);
  });

  it("должен очищать текущий ингредиент", () => {
    const stateWithIngredient = { current: ingredient };
    const state = reducer(stateWithIngredient, clearCurrentIngredient());
    expect(state.current).toBeNull();
  });
});
