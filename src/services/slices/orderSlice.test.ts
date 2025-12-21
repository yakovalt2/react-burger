import orderReducer, { createOrder, clearOrder } from "./orderSlice";

describe("orderSlice", () => {
  const initialState = {
    orderNumber: null,
    loading: false,
    error: null,
  };

  it("должен возвращать начальное состояние", () => {
    expect(orderReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("clearOrder сбрасывает состояние", () => {
    const state = {
      orderNumber: 123,
      loading: true,
      error: "Ошибка",
    };
    expect(orderReducer(state, clearOrder())).toEqual(initialState);
  });

  it("createOrder.pending устанавливает loading=true", () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("createOrder.fulfilled устанавливает orderNumber и loading=false", () => {
    const action = { type: createOrder.fulfilled.type, payload: 456 };
    const state = orderReducer(initialState, action);
    expect(state.orderNumber).toBe(456);
    expect(state.loading).toBe(false);
  });

  it("createOrder.rejected устанавливает error и loading=false", () => {
    const action = { type: createOrder.rejected.type, payload: "Ошибка" };
    const state = orderReducer(initialState, action);
    expect(state.error).toBe("Ошибка");
    expect(state.loading).toBe(false);
  });
});
