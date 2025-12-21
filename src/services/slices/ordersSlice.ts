import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../../utils/action-types";
import { TOrder } from "../../utils/types";
import { TIngredient } from "../../utils/types";

type OrdersState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  wsConnected: boolean;
  error: Event | null;
  currentOrder?: TOrder & {
    ingredientsData: TIngredient[];
    totalPrice: number;
  };
};

const initialState: OrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  error: null,
};

const SET_CURRENT_ORDER = "SET_CURRENT_ORDER";
const CLEAR_CURRENT_ORDER = "CLEAR_CURRENT_ORDER";

export const setCurrentOrder = (order?: TOrder) => ({
  type: SET_CURRENT_ORDER,
  payload: order,
});

export const clearCurrentOrder = () => ({
  type: CLEAR_CURRENT_ORDER,
});

export const ordersReducer = (
  state = initialState,
  action: any
): OrdersState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return { ...state, wsConnected: true };

    case WS_CONNECTION_ERROR:
      return { ...state, error: action.payload };

    case WS_CONNECTION_CLOSED:
      return { ...state, wsConnected: false };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    case SET_CURRENT_ORDER:
      return { ...state, currentOrder: action.payload };

    case CLEAR_CURRENT_ORDER:
      return { ...state, currentOrder: undefined };

    default:
      return state;
  }
};
