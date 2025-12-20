import React from "react";
import styles from "./order-details.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder } from "../../utils/types";
import { useAppSelector } from "../../services/store";
import { TIngredient } from "../../utils/types";
import formatOrderDate from "../../utils/formatOrderDate";

type Props = {
  order: TOrder & { ingredientsData: TIngredient[]; totalPrice: number };
};
type IngredientWithCount = TIngredient & { count: number };

export const OrderDetails: React.FC<Props> = ({ order }) => {
  const { items: allIngredients } = useAppSelector((s) => s.ingredients);

  const orderIngredients = order.ingredients
    .map((id) => allIngredients.find((i) => i._id === id))
    .filter(Boolean);

  const groupedIngredients: IngredientWithCount[] = orderIngredients.reduce(
    (acc: IngredientWithCount[], ingredient) => {
      const existing = acc.find((i) => i._id === ingredient!._id);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ ...(ingredient as TIngredient), count: 1 });
      }
      return acc;
    },
    []
  );

  const totalPrice = orderIngredients.reduce((sum, i) => sum + i!.price, 0);

  return (
    <div className={styles.wrapper}>
      <p className="text text_type_main-medium mt-4 mb-4">{order.name}</p>

      <p
        className={`text text_type_main-default mb-4 ${
          order.status === "done" ? styles.done : styles.pending
        }`}
      >
        {order.status === "done" ? "Выполнен" : "В работе"}
      </p>

      <div className={styles.composition}>
        <p className="text text_type_main-medium mb-2">Состав:</p>
        <div className={`${styles.scroll} ${styles.list}`}>
          {groupedIngredients.map((item, index) => (
            <div key={`${item!._id}-${index}`} className={styles.item}>
              <div className={styles.ingredient}>
                <img src={item!.image} alt={item!.name} />
                <p className="text text_type_main-default">{item!.name}</p>
              </div>
              <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">
                  {item.count} x {item.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          {formatOrderDate(order.createdAt)}
        </p>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
