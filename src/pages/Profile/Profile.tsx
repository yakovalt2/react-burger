import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../services/store";
import { logoutUser } from "../../services/slices/authSlice";
import styles from "./profile.module.css";

export function ProfilePage() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            `${styles.link} text text_type_main-default ${
              isActive ? styles.linkActive : ""
            }`
          }
        >
          Профиль
        </NavLink>

        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            `${styles.link} text text_type_main-default ${
              isActive ? styles.linkActive : ""
            }`
          }
        >
          История заказов
        </NavLink>

        <Button
          htmlType="button"
          type="secondary"
          extraClass={styles.logoutButton}
          onClick={() => dispatch(logoutUser())}
        >
          Выход
        </Button>

        <p className="text mt-20 text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
