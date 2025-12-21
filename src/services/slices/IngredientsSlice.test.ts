import reducer, {
  IngredientsState,
  incrementCount,
  decrementCount,
  resetCounts,
  fetchIngredients,
} from "./IngredientsSlice";
import { IngredientWithCount } from "../../utils/types";

describe("ingredientsSlice", () => {
  const initialState: IngredientsState = {
    items: [],
    status: "idle",
    error: null,
  };

  const mockItem: IngredientWithCount = {
    _id: "1",
    name: "Bun",
    type: "bun",
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: "",
    image_mobile: "",
    image_large: "",
    count: 0,
  };

  it("должен возвращать начальное состояние", () => {
    expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("incrementCount увеличивает count на 1", () => {
    const state = { ...initialState, items: [{ ...mockItem, count: 0 }] };
    const nextState = reducer(state, incrementCount("1"));
    expect(nextState.items[0].count).toBe(1);
  });

  it("decrementCount уменьшает count на 1, но не меньше 0", () => {
    const state = { ...initialState, items: [{ ...mockItem, count: 1 }] };
    const nextState = reducer(state, decrementCount("1"));
    expect(nextState.items[0].count).toBe(0);

    const nextState2 = reducer(nextState, decrementCount("1"));
    expect(nextState2.items[0].count).toBe(0);
  });

  it("resetCounts обнуляет все count", () => {
    const state = {
      ...initialState,
      items: [
        { ...mockItem, _id: "1", count: 2 },
        { ...mockItem, _id: "2", count: 3 },
      ],
    };
    const nextState = reducer(state, resetCounts());
    expect(nextState.items.every((i) => i.count === 0)).toBe(true);
  });

  it("fetchIngredients.pending устанавливает статус loading", () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state.status).toBe("loading");
    expect(state.error).toBeNull();
  });

  it("fetchIngredients.fulfilled устанавливает статус succeeded и обновляет items", () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: [mockItem],
    };
    const state = reducer(initialState, action);
    expect(state.status).toBe("succeeded");
    expect(state.items).toEqual([mockItem]);
  });

  it("fetchIngredients.rejected устанавливает статус failed и очищает items", () => {
    const action = {
      type: fetchIngredients.rejected.type,
      payload: "Ошибка",
    };
    const state = reducer(initialState, action);
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Ошибка");
    expect(state.items).toEqual([]);
  });
});
