import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import { OrderDetails } from "../../components/order-details/OrderDetails";
import { useOrders } from "../../services/useOrders";

type Props = {
  orderId: string;
};

export const OrderPage: React.FC = () => {
  const { id } = useParams();
  const { items: ingredients } = useAppSelector((state) => state.ingredients);

  const { orders } = useOrders(ingredients);

  const order = orders.find((o) => o._id === id);

  if (!order) {
    return <p className="text text_type_main-default">Заказ не найден</p>;
  }

  return <OrderDetails order={order} />;
};
