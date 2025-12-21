import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../modal/Modal";
import { OrderDetails } from "../order-details/OrderDetails";
import { useAppSelector } from "../../services/store";
import { useOrders } from "../../services/useOrders";

type Props = {
  orderId: string;
};

export const OrderModal: React.FC<Props> = ({ orderId }) => {
  const navigate = useNavigate();
  const { items: allIngredients } = useAppSelector((s) => s.ingredients);
  const { orders } = useOrders(allIngredients);

  const order = orders.find((o) => o._id === orderId);

  if (!order) return <p>Заказ не найден</p>;

  return <OrderDetails order={order} isModal={true}/>;
};
