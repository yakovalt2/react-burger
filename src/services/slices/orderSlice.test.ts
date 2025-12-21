import orderReducer, { createOrder, clearOrder, initialState } from "./orderSlice";

const CREATE_PENDING = createOrder.pending.type;
const CREATE_FULFILLED = createOrder.fulfilled.type;
const CREATE_REJECTED = createOrder.rejected.type;

describe("orderSlice", () => {
  it("должен возвращать initialState", () => {
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
    const action = { type: CREATE_PENDING };
    const state = orderReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it("createOrder.fulfilled устанавливает orderNumber и loading=false", () => {
    const action = { type: CREATE_FULFILLED, payload: 456 };
    const state = orderReducer(initialState, action);
    expect(state.orderNumber).toBe(456);
    expect(state.loading).toBe(false);
  });

  it("createOrder.rejected устанавливает error и loading=false", () => {
    const action = { type: CREATE_REJECTED, payload: "Ошибка" };
    const state = orderReducer(initialState, action);
    expect(state.error).toBe("Ошибка");
    expect(state.loading).toBe(false);
  });
});
