import React from "react";
import styles from "./order-details.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder } from "../../utils/types";
import { useAppSelector } from "../../services/store";
import { TIngredient } from "../../utils/types";

type Props = {
  order: TOrder & { ingredientsData: TIngredient[]; totalPrice: number };
};

export const OrderDetails: React.FC<Props> = ({ order }) => {
  const { items: allIngredients } = useAppSelector((s) => s.ingredients);

  const orderIngredients = order.ingredients
    .map((id) => allIngredients.find((i) => i._id === id))
    .filter(Boolean);

  const totalPrice = orderIngredients.reduce((sum, i) => sum + i!.price, 0);

  return (
    <div className={styles.wrapper}>
      <p className={`text text_type_digits-default ${styles.number}`}>
        #{order.number}
      </p>

      <p className="text text_type_main-medium mt-4 mb-4">{order.name}</p>

      <p
        className={`text text_type_main-default mb-4 ${
          order.status === "done" ? styles.done : styles.pending
        }`}
      >
        {order.status === "done" ? "Выполнен" : "В работе"}
      </p>

      <div className={styles.composition}>
        <p className="text text_type_main-default mb-2">Состав:</p>
        <div className={`${styles.scroll} ${styles.list}`}>
          {orderIngredients.map((item, index) => (
            <div key={`${item!._id}-${index}`} className={styles.item}>
              <div className={styles.ingredient}>
                <img src={item!.image} alt={item!.name} />
                <p className="text text_type_main-default">{item!.name}</p>
              </div>
              <div className={styles.price}>
                <p className="text text_type_digits-default mr-2">
                  {item!.price}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <p className="text text_type_main-default">Итого:</p>
        <div className={styles.price}>
          <p className="text text_type_digits-default mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
