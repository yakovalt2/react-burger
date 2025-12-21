import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  setBun,
} from "./constructorSlice";
import { IngredientWithCount } from "../../utils/types";

describe("constructorSlice", () => {
  const initialState = {
    bun: null,
    items: [],
  };

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

  const bun: IngredientWithCount = {
    _id: "2",
    name: "Bun",
    type: "bun",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 5,
    image: "",
    image_mobile: "",
    image_large: "",
    count: 0,
  };

  it("должен возвращать начальное состояние", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("добавляет обычный ингредиент", () => {
    const action = addIngredient(ingredient);
    const state = reducer(initialState, action);
    expect(state.items.length).toBe(1);
    expect(state.items[0].name).toBe("Lettuce");
    expect(state.bun).toBeNull();
  });

  it("устанавливает булку", () => {
    const action = addIngredient(bun);
    const state = reducer(initialState, action);
    expect(state.bun?.name).toBe("Bun");
    expect(state.items.length).toBe(0);
  });

  it("удаляет ингредиент по индексу", () => {
    const stateWithItem = reducer(initialState, addIngredient(ingredient));
    const state = reducer(stateWithItem, removeIngredient(0));
    expect(state.items.length).toBe(0);
  });

  it("удаляет ингредиент по uid", () => {
    const stateWithItem = reducer(initialState, addIngredient(ingredient));
    const uid = stateWithItem.items[0].uid;
    const state = reducer(stateWithItem, removeIngredient(uid));
    expect(state.items.length).toBe(0);
  });

  it("перемещает ингредиент", () => {
    const stateWithItems = reducer(initialState, addIngredient(ingredient));
    const ingredient2 = { ...ingredient, _id: "3" };
    const stateWithTwo = reducer(stateWithItems, addIngredient(ingredient2));
    const uid1 = stateWithTwo.items[0].uid;
    const uid2 = stateWithTwo.items[1].uid;

    const movedState = reducer(
      stateWithTwo,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(movedState.items[0].uid).toBe(uid2);
    expect(movedState.items[1].uid).toBe(uid1);
  });

  it("очищает конструктор", () => {
    const stateWithBunAndItem = {
      bun: { ...bun, uid: "123" },
      items: [{ ...ingredient, uid: "456" }],
    };
    const state = reducer(stateWithBunAndItem, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.items.length).toBe(0);
  });

  it("setBun устанавливает булку", () => {
    const state = reducer(initialState, setBun(bun));
    expect(state.bun?.name).toBe("Bun");
  });

  it("setBun сбрасывает булку при null", () => {
    const stateWithBun = reducer(initialState, setBun(bun));
    const state = reducer(stateWithBun, setBun(null));
    expect(state.bun).toBeNull();
  });
});
