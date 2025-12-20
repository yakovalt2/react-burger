import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./store";
import { wsOrdersActions } from "../utils/wsActions";
import { TIngredient, TOrder } from "../utils/types";
import { WS_URL } from "../utils/constants";

export const useOrders = (ingredients: TIngredient[], isProfile = false) => {
  const dispatch = useAppDispatch();
  const { orders, total, totalToday } = useAppSelector((state) => state.orders);

  useEffect(() => {
    const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");

    const wsUrl = isProfile
      ? `${WS_URL}/orders?token=${token}`
      : `${WS_URL}/orders/all`;

    dispatch({ type: wsOrdersActions.wsInit, payload: wsUrl });

    return () => {
      dispatch({ type: wsOrdersActions.wsClose });
    };
  }, [dispatch, isProfile]);

  const enrichedOrders = useMemo(() => {
    return orders.map((order) => {
      const ingredientsData = order.ingredients
        .map((id) => ingredients.find((i) => i._id === id))
        .filter(Boolean) as TIngredient[];

      const totalPrice = ingredientsData.reduce((sum, i) => sum + i.price, 0);

      return { ...order, ingredientsData, totalPrice };
    });
  }, [orders, ingredients]);

  return {
    orders: enrichedOrders,
    total,
    totalToday,
  };
};
