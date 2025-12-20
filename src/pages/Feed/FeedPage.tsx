import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./feed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import formatOrderDate from "../../utils/formatOrderDate";
import { useAppSelector } from "../../services/store";
import { useOrders } from "../../services/useOrders";
import { TIngredient } from "../../utils/types";

export function FeedPage() {
  const { items: ingredients } = useAppSelector((state) => state.ingredients);
  const { orders, total, totalToday } = useOrders(ingredients);

  const doneOrders = orders.filter((o) => o.status === "done");
  const pendingOrders = orders.filter((o) => o.status !== "done");

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h2 className="text text_type_main-large mb-4">Лента заказов</h2>
        <div className={styles.orderList}>
          {orders.map((order) => {
            const orderIngredients = order.ingredients
              .map((id) => ingredients.find((item) => item._id === id))
              .filter(Boolean) as TIngredient[];

            const totalPrice = orderIngredients.reduce(
              (sum, item) => sum + item.price,
              0
            );

            return (
              <Link
                key={order._id}
                to={`/feed/${order._id}`}
                className={styles.orderCard}
              >
                <div className={styles.cardHeader}>
                  <p className="text text_type_digits-default">
                    #{order.number}
                  </p>
                  <p className="text text_type_main-default text_color_inactive">
                    {formatOrderDate(order.createdAt)}
                  </p>
                </div>
                <p
                  className={`text text_type_main-default mb-2 ${styles.orderName}`}
                >
                  {order.name || "Заказ"}
                </p>
                <div className={styles.cardFooter}>
                  <div className={styles.ingredients}>
                    {orderIngredients.slice(0, 5).map((item, index) => (
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
                      {totalPrice}
                    </p>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.statusColumns}>
          <div className={styles.statusColumn}>
            <p className="text text_type_main-default mb-2">Готово</p>
            <div className={styles.orderNumbers}>
              {doneOrders.slice(-5).map((o) => (
                <p key={o._id} className="text text_type_digits-default">
                  {o.number}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.statusColumn}>
            <p className="text text_type_main-default mb-2">В работе</p>
            <div className={styles.orderNumbers}>
              {pendingOrders.slice(-5).map((o) => (
                <p key={o._id} className="text text_type_digits-default">
                  {o.number}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.statFull}>
          <p className="text text_type_main-default">Выполнено за все время</p>
          <p className="text text_type_digits-default">{total}</p>
        </div>
        <div className={styles.statFull}>
          <p className="text text_type_main-default">Выполнено сегодня</p>
          <p className="text text_type_digits-default">{totalToday}</p>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
