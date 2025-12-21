import {
  ordersReducer,
  setCurrentOrder,
  clearCurrentOrder,
  initialState,
} from "./ordersSlice";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../../utils/action-types";

import { TOrder, TIngredient } from "../../utils/types";

// Тестовые данные
const TEST_ORDER: TOrder = {
  _id: "1",
  ingredients: [],
  status: "done",
  number: 123,
  name: "Тестовый заказ",
  createdAt: "2025-12-21T12:00:00.000Z",
};

const TEST_CURRENT_ORDER = {
  ...TEST_ORDER,
  ingredientsData: [] as TIngredient[],
  totalPrice: 0,
};

describe("ordersReducer", () => {
  it("должен возвращать initialState", () => {
    expect(ordersReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("WS_CONNECTION_SUCCESS устанавливает wsConnected в true", () => {
    const state = ordersReducer(initialState, { type: WS_CONNECTION_SUCCESS });
    expect(state.wsConnected).toBe(true);
  });

  it("WS_CONNECTION_ERROR устанавливает ошибку", () => {
    const error = new Event("error");
    const state = ordersReducer(initialState, {
      type: WS_CONNECTION_ERROR,
      payload: error,
    });
    expect(state.error).toBe(error);
  });

  it("WS_CONNECTION_CLOSED устанавливает wsConnected в false", () => {
    const connectedState = { ...initialState, wsConnected: true };
    const state = ordersReducer(connectedState, { type: WS_CONNECTION_CLOSED });
    expect(state.wsConnected).toBe(false);
  });

  it("WS_GET_MESSAGE обновляет список заказов и статистику", () => {
    const orders = [TEST_ORDER];
    const payload = { orders, total: 10, totalToday: 5 };
    const state = ordersReducer(initialState, { type: WS_GET_MESSAGE, payload });
    expect(state.orders).toEqual(orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(5);
  });

  it("setCurrentOrder устанавливает текущий заказ", () => {
    const state = ordersReducer(initialState, setCurrentOrder(TEST_CURRENT_ORDER));
    expect(state.currentOrder).toEqual(TEST_CURRENT_ORDER);
  });

  it("clearCurrentOrder очищает текущий заказ", () => {
    const stateWithOrder = { ...initialState, currentOrder: TEST_CURRENT_ORDER };
    const state = ordersReducer(stateWithOrder, clearCurrentOrder());
    expect(state.currentOrder).toBeUndefined();
  });
});
