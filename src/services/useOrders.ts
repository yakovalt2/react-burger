import { useEffect, useState } from "react";
import { TIngredient } from "../utils/types";
import { WS_URL } from "../utils/constants";

export interface TOrderWS {
  _id: string;
  number: number;
  name?: string;
  status: "done" | "pending" | "created";
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
  totalPrice?: number;
}

export function useOrders(allIngredients: TIngredient[]) {
  const [orders, setOrders] = useState<TOrderWS[]>([]);
  const [total, setTotal] = useState(0);
  const [totalToday, setTotalToday] = useState(0);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => console.log("WS connected");
    ws.onclose = () => console.log("WS disconnected");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
      if (data.success) {
        const enrichedOrders: TOrderWS[] = data.orders.map((order: TOrderWS) => {
          const totalPrice = order.ingredients.reduce((sum, id) => {
            const ingredient = allIngredients.find((i) => i._id === id);
            return sum + (ingredient?.price || 0);
          }, 0);
          return { ...order, totalPrice };
        });
        setOrders(enrichedOrders);
        setTotal(data.total);
        setTotalToday(data.totalToday);
      }
    };

    return () => {
      ws.close();
    };
  }, [allIngredients]);

  return { orders, total, totalToday };
}
