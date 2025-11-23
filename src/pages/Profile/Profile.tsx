import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./profile.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../services/store";
import {
  logoutUser,
  getUser,
  updateUser,
} from "../../services/slices/authSlice";
import { useAppSelector } from "../../services/store";
import { getCookie } from "../../utils/cookie";

export function ProfilePage() {
  const [name, setName] = useState("Имя");
  const [email, setEmail] = useState("email@example.com");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.user) {
      dispatch(getUser());
    } else {
      setName(auth.user.name);
      setEmail(auth.user.email);
    }
  }, [auth.user, dispatch]);

  const handleSave = () => {
    dispatch(updateUser({ name, email, password }));
  };

  const handleCancel = () => {
    if (auth.user) {
      setName(auth.user.name);
      setEmail(auth.user.email);
      setPassword("");
    }
  };

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
          size="medium"
          extraClass={styles.logoutButton}
          onClick={() => dispatch(logoutUser())}
        >
          Выйти
        </Button>
      </nav>

      <div className={styles.content}>
        <Input
          type="text"
          placeholder="Имя"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />

        <Input
          type="email"
          placeholder="Логин"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />

        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />

        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={handleSave}
            disabled={!name || !email}
          >
            Сохранить
          </Button>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={handleCancel}
          >
            Отмена
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
