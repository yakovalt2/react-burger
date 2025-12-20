import { TOrder } from "../../utils/types";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card.module.css";
import { TIngredient } from "../../utils/types";
import formatOrderDate from "../../utils/formatOrderDate";

interface OrderCardProps {
  order: TOrder & { ingredientsData: TIngredient[]; totalPrice: number };
  pathPrefix: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, pathPrefix }) => {
  const location = useLocation();
  return (
    <Link to={`${pathPrefix}/${order._id}`} state={{ background: location }} className={styles.orderCard}>
      <div className={styles.cardHeader}>
        <p className="text text_type_digits-default">#{order.number}</p>
        <p className="text text_type_main-default text_color_inactive">
          {formatOrderDate(order.createdAt)}
        </p>
      </div>

      <p className={`text text_type_main-medium ${styles.orderName}`}>
        {order.name || "Заказ"}
      </p>

      <div className={styles.cardFooter}>
        <div className={styles.ingredients}>
          {order.ingredientsData.slice(0, 5).map((item, index) => (
            <div
              key={`${item._id}-${index}`}
              className={styles.ingredient}
              style={{ zIndex: 10 - index }}
            >
              <img src={item.image} alt={item.name} />
            </div>
          ))}
        </div>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">
            {order.totalPrice}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </Link>
  );
};
