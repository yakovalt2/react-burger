import { Outlet, useLocation } from "react-router-dom";
import styles from "./profile-orders.module.css";
import { useOrders } from "../../services/useOrders";
import { useAppSelector } from "../../services/store";
import { OrderCard } from "../../components/order-card/OrderCard";
import Loader from "../../components/loader/Loader";

export default function ProfileOrdersPage() {
  const { items: ingredients } = useAppSelector((state) => state.ingredients);
  const { orders } = useOrders(ingredients, true);

  if (ingredients.length === 0 || orders.length === 0) {
    return <Loader />;
  }

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.orderList}>
        {sortedOrders.map((order) => (
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
