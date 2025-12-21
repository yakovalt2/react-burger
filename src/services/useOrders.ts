import { useEffect, useMemo, useRef } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { TIngredient, TWSStoreActions } from "../utils/types";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from "../utils/action-types";
import { WS_URL } from "../utils/constants";

export const wsOrdersActions: TWSStoreActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE, 
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

export const useOrders = (ingredients: TIngredient[], isProfile = false) => {
  const dispatch = useAppDispatch();
  const { orders, total, totalToday } = useAppSelector((state) => state.orders);

  const socketOpenedRef = useRef(false); 

  useEffect(() => {
    if (socketOpenedRef.current) return; 
    socketOpenedRef.current = true;

    const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");
    const wsUrl = isProfile
      ? `${WS_URL}/orders?token=${token}`
      : `${WS_URL}/orders/all`;

    dispatch({ type: wsOrdersActions.wsInit, payload: wsUrl });

    return () => {
      dispatch({ type: wsOrdersActions.onClose }); 
      socketOpenedRef.current = false;
      console.log("WebSocket закрыт при уходе со страницы");
    };
  }, [dispatch, isProfile]);

  const enrichedOrders = useMemo(() => {
    return orders.map((order) => {
      const ingredientsData = order.ingredients
        .map((id: string) => ingredients.find((i) => i._id === id))
        .filter(Boolean) as TIngredient[];
      const totalPrice = ingredientsData.reduce((sum, i) => sum + i.price, 0);
      return { ...order, ingredientsData, totalPrice };
    });
  }, [orders, ingredients]);

  return { orders: enrichedOrders, total, totalToday };
};
