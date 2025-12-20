import React from "react";
import { useParams } from "react-router-dom";
import styles from "./feed-order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../services/store";
import { useOrders } from "../../services/useOrders";
import formatOrderDate from "../../utils/formatOrderDate";
import { TIngredient } from "../../utils/types";

export function FeedOrderPage() {
  const { id } = useParams<{ id: string }>();

  const { items: ingredients } = useAppSelector((state) => state.ingredients);

  const { orders } = useOrders(ingredients);

  const order = orders.find((o) => o._id === id);

  if (!order) {
    return <p className="text text_type_main-default">Заказ не найден</p>;
  }

  const orderIngredients = order.ingredients
    .map((id) => ingredients.find((item) => item._id === id))
    .filter(Boolean) as TIngredient[];

  const totalPrice = orderIngredients.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const ingredientsMap = order.ingredients.reduce<Record<string, number>>(
    (acc, id) => {
      acc[id] = (acc[id] || 0) + 1;
      return acc;
    },
    {}
  );

  const groupedIngredients = Object.entries(ingredientsMap)
    .map(([id, count]) => {
      const ingredient = ingredients.find((i) => i._id === id);
      return ingredient ? { ...ingredient, count } : null;
    })
    .filter(Boolean) as (TIngredient & { count: number })[];

  const statusText =
    order.status === "done"
      ? "Выполнен"
      : order.status === "pending"
      ? "Готовится"
      : "Создан";

  return (
    <div className={styles.wrapper}>
      <p className={`text text_type_digits-default ${styles.number}`}>
        #{order.number}
      </p>

      <h2 className="text text_type_main-default mt-5">
        {order.name || "Заказ"}
      </h2>

      <p
        className={`text text_type_main-default mt-2 ${
          order.status === "done" ? styles.done : styles.pending
        }`}
      >
        {statusText}
      </p>

      <div className={styles.composition}>
        <p className="text text_type_main-medium mb-3">Состав:</p>

        <div className={styles.scroll}>
          <ul className={styles.list}>
            {groupedIngredients.map((item) => (
              <li key={item._id} className={styles.item}>
                <div className={styles.ingredient}>
                  <img src={item.image} alt={item.name} />
                  <span className="text text_type_main-default ml-2">
                    {item.name}
                  </span>
                </div>

                <div className={styles.price}>
                  <span className="text text_type_digits-default mr-2">
                    {item.count} × {item.price}
                  </span>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.footer}>
        <p className="text text_type_main-default text_color_inactive">
          {formatOrderDate(order.createdAt)}
        </p>

        <div className={styles.price}>
          <span className="text text_type_digits-default mr-2">
            {totalPrice}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
