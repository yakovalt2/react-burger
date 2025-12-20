import { useEffect, useState } from "react";
import { TIngredient, TOrder } from "../utils/types";
import { WS_URL } from "../utils/constants";

export function useOrders(allIngredients: TIngredient[], isProfile = false) {
  const [orders, setOrders] = useState<
    (TOrder & { ingredientsData: TIngredient[]; totalPrice: number })[]
  >([]);
  const [total, setTotal] = useState(0);
  const [totalToday, setTotalToday] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("accessToken")?.replace("Bearer ", "");
    const wsUrl = isProfile
      ? `${WS_URL}/orders?token=${token}`
      : `${WS_URL}/orders/all`;

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => console.log("WS connected");
    ws.onclose = () => console.log("WS disconnected");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.success) {
        const enrichedOrders = data.orders.map((order: TOrder) => {
          const ingredientsData = order.ingredients
            .map((id) => allIngredients.find((i) => i._id === id))
            .filter(Boolean) as TIngredient[];
          const totalPrice = ingredientsData.reduce(
            (sum, i) => sum + i.price,
            0
          );
          return { ...order, ingredientsData, totalPrice };
        });

        setOrders(enrichedOrders);
        setTotal(data.total);
        setTotalToday(data.totalToday);
      }
    };

    return () => ws.close();
  }, [allIngredients]);

  return { orders, total, totalToday };
}
