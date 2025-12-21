import {
  ordersReducer,
  setCurrentOrder,
  clearCurrentOrder,
} from "./ordersSlice";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../../utils/action-types";

import { TOrder, TIngredient } from "../../utils/types";

const getTestOrder = (): TOrder => ({
  _id: "1",
  ingredients: [],
  status: "done",
  number: 123,
  name: "Тестовый заказ",
  createdAt: "2025-12-21T12:00:00.000Z",
});

const getTestCurrentOrder = () => ({
  ...getTestOrder(),
  ingredientsData: [] as TIngredient[],
  totalPrice: 0,
});

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  error: null,
  currentOrder: undefined,
};

describe("ordersReducer", () => {
  it("должен возвращать начальное состояние", () => {
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
    const orders = [getTestOrder()];
    const payload = { orders, total: 10, totalToday: 5 };
    const state = ordersReducer(initialState, {
      type: WS_GET_MESSAGE,
      payload,
    });
    expect(state.orders).toEqual(orders);
    expect(state.total).toBe(10);
    expect(state.totalToday).toBe(5);
  });

  it("setCurrentOrder устанавливает текущий заказ", () => {
    const order = getTestCurrentOrder();
    const state = ordersReducer(initialState, setCurrentOrder(order));
    expect(state.currentOrder).toEqual(order);
  });

  it("clearCurrentOrder очищает текущий заказ", () => {
    const order = getTestCurrentOrder();
    const stateWithOrder = { ...initialState, currentOrder: order };
    const state = ordersReducer(stateWithOrder, clearCurrentOrder());
    expect(state.currentOrder).toBeUndefined();
  });
});
