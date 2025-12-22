import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  setBun,
  initialState,
} from "./constructorSlice";
import { IngredientWithCount } from "../../utils/types";

// Константы для тестов
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

const BUN: IngredientWithCount = {
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

describe("constructorSlice", () => {
  it("должен возвращать initialState", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("добавляет обычный ингредиент", () => {
    const state = reducer(initialState, addIngredient(INGREDIENT));
    expect(state.items.length).toBe(1);
    expect(state.items[0].name).toBe(INGREDIENT.name);
    expect(state.bun).toBeNull();
  });

  it("устанавливает булку через addIngredient", () => {
    const state = reducer(initialState, addIngredient(BUN));
    expect(state.bun?.name).toBe(BUN.name);
    expect(state.items.length).toBe(0);
  });

  it("удаляет ингредиент по индексу", () => {
    const stateWithItem = reducer(initialState, addIngredient(INGREDIENT));
    const state = reducer(stateWithItem, removeIngredient(0));
    expect(state.items.length).toBe(0);
  });

  it("удаляет ингредиент по uid", () => {
    const stateWithItem = reducer(initialState, addIngredient(INGREDIENT));
    const uid = stateWithItem.items[0].uid;
    const state = reducer(stateWithItem, removeIngredient(uid));
    expect(state.items.length).toBe(0);
  });

  it("перемещает ингредиенты", () => {
    const stateWithItems = reducer(initialState, addIngredient(INGREDIENT));
    const INGREDIENT2 = { ...INGREDIENT, _id: "3" };
    const stateWithTwo = reducer(stateWithItems, addIngredient(INGREDIENT2));

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
      bun: { ...BUN, uid: "123" },
      items: [{ ...INGREDIENT, uid: "456" }],
    };
    const state = reducer(stateWithBunAndItem, clearConstructor());
    expect(state.bun).toBeNull();
    expect(state.items.length).toBe(0);
  });

  it("setBun устанавливает булку", () => {
    const state = reducer(initialState, setBun(BUN));
    expect(state.bun?.name).toBe(BUN.name);
  });

  it("setBun сбрасывает булку при null", () => {
    const stateWithBun = reducer(initialState, setBun(BUN));
    const state = reducer(stateWithBun, setBun(null));
    expect(state.bun).toBeNull();
  });
});
