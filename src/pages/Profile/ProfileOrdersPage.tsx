import { Outlet } from "react-router-dom";
import styles from "./profile-orders.module.css";
import { useOrders } from "../../services/useOrders";
import { useAppSelector } from "../../services/store";
import { OrderCard } from "../../components/order-card/OrderCard";

export default function ProfileOrdersPage() {
  const { items: ingredients } = useAppSelector((state) => state.ingredients);
  const { orders } = useOrders(ingredients, true);

  return (
    <div className={styles.wrapper}>
      <div className={styles.orderList}>
        {orders.map((order) => (
          <OrderCard
            key={order._id}
            order={order}
            pathPrefix="/profile/orders"
          />
        ))}
      </div>

      <Outlet />
    </div>
  );
}
