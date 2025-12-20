import { useParams } from "react-router-dom";
import styles from './profile-orders.module.css'
import { useOrders } from "../../services/useOrders";
import { useAppSelector } from "../../services/store";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import formatOrderDate from "../../utils/formatOrderDate";

export default function ProfileOrderPage() {
  const { id } = useParams();
  const { items: ingredients } = useAppSelector(
    (state) => state.ingredients
  );

  const { orders } = useOrders(ingredients);
  const order = orders.find((o) => o._id === id);

  if (!order) return null;

  const orderIngredients = order.ingredients
    .map((id) => ingredients.find((i) => i._id === id))
    .filter(Boolean);

  const totalPrice = orderIngredients.reduce(
    (sum, i) => sum + i!.price,
    0
  );

  return (
    <div className={styles.wrapper}>
      <p className={`text text_type_digits-default ${styles.number}`}>
        #{order.number}
      </p>

      <h2 className="text text_type_main-medium mt-5">
        {order.name}
      </h2>

      <p className="text text_type_main-default mb-10">
        {order.status === "done"
          ? "Выполнен"
          : "В работе"}
      </p>

      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          {formatOrderDate(order.createdAt)}
        </p>

        <p className="text text_type_digits-default">
          {totalPrice} <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
}
