import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./feed.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import formatOrderDate from "../../utils/formatOrderDate";
import { useAppSelector } from "../../services/store";
import { useOrders } from "../../services/useOrders";
import { TIngredient } from "../../utils/types";
import { OrderCard } from "../../components/order-card/OrderCard";
import Loader from "../../components/loader/Loader";
import { useAppDispatch } from "../../services/store";
import { setCurrentOrder } from "../../services/slices/ordersSlice";
import { useNavigate } from "react-router-dom";

export function FeedPage() {
  const { items: ingredients } = useAppSelector((state) => state.ingredients);
  const { orders, total, totalToday } = useOrders(ingredients);

  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || ingredients.length === 0 || orders.length === 0) {
    return <Loader />;
  }

  const openModal = (order: any) => {
    dispatch(setCurrentOrder(order));
    navigate(`/feed/${order._id}`, { state: { background: location } });
  };

  const doneOrders = orders.filter((o) => o.status === "done");
  const pendingOrders = orders.filter((o) => o.status !== "done");

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <h2 className="text text_type_main-large mb-4 ml-4">Лента заказов</h2>
        <div className={styles.orderList}>
          {sortedOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              pathPrefix="/feed"
              onClick={() => openModal(order)}
            />
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.statusColumns}>
          <div className={styles.statusColumn}>
            <p className="text text_type_main-medium mb-2">Готовы: </p>
            <div className={styles.orderNumbers}>
              {doneOrders.slice(0, 5).map((o) => (
                <p key={o._id} className="text text_type_digits-default">
                  {o.number}
                </p>
              ))}
            </div>
          </div>
          <div className={styles.statusColumn}>
            <p className="text text_type_main-medium mb-2">В работе: </p>
            <div className={styles.orderNumbers}>
              {pendingOrders.slice(0, 5).map((o) => (
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
