import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./feed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import formatOrderDate from "../../utils/formatOrderDate";
import { useAppSelector } from "../../services/store";
import { useOrders } from "../../services/useOrders";
import { TIngredient } from "../../utils/types";
import { OrderCard } from "../../components/order-card/OrderCard";
import Loader from "../../components/loader/Loader";

export function FeedPage() {
  const { items: ingredients } = useAppSelector((state) => state.ingredients);
  const { orders, total, totalToday } = useOrders(ingredients);

  if (ingredients.length === 0 || orders.length === 0) {
    return <Loader />;
  }

  const doneOrders = orders.filter((o) => o.status === "done");
  const pendingOrders = orders.filter((o) => o.status !== "done");

  console.log(orders);

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h2 className="text text_type_main-large mb-4 ml-4">Лента заказов</h2>
        <div className={styles.orderList}>
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} pathPrefix="/feed" />
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.statusColumns}>
          <div className={styles.statusColumn}>
            <p className="text text_type_main-medium mb-2">Готовы: </p>
            <div className={styles.orderNumbers}>
              {doneOrders.slice(-5).map((o) => (
                <p key={o._id} className="text text_type_digits-default">
                  {o.number}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.statusColumn}>
            <p className="text text_type_main-medium mb-2">В работе: </p>
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
          <p className="text text_type_digits-large">{total}</p>
        </div>
        <div className={styles.statFull}>
          <p className="text text_type_main-default">Выполнено сегодня</p>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
      </div>

      <Outlet />
    </div>
  );
}
