import React from "react";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./AppHeader.module.css";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../services/store";

const AppHeader: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>

        <div className={styles.left}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </NavLink>

          <NavLink
            to="/feed"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ""}`
            }
          >
            <ListIcon type="secondary" />
            <p className="text text_type_main-default ml-2 text_color_inactive">
              Лента заказов
            </p>
          </NavLink>
        </div>

        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.right}>
          {user ? (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              <ProfileIcon type="primary" />
              <p className="text text_type_main-default ml-2">
                Личный кабинет
              </p>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
              }
            >
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default ml-2 text_color_inactive">
                Войти
              </p>
            </NavLink>
          )}
        </div>

      </nav>
    </header>
  );
};

export default AppHeader;