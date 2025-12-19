import React, { useState, useEffect } from "react";
import { NavLink, Routes, Route, Outlet } from "react-router-dom";
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

import ProfileOrderPage from "./ProfileOrderPage";
import ProfileOrdersPage from "./ProfileOrdersPage";

export function ProfilePage() {
  const [name, setName] = useState("Имя");
  const [email, setEmail] = useState("email@example.com");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (!auth.user) {
      dispatch(getUser());
    } else {
      setName(auth.user.name);
      setEmail(auth.user.email);
    }
  }, [auth.user, dispatch]);

  useEffect(() => {
    if (!auth.user) return;
    setIsChanged(
      name !== auth.user.name || email !== auth.user.email || password !== ""
    );
  }, [name, email, password, auth.user]);

  const handleSave = () => {
    dispatch(updateUser({ name, email, password }));
    setPassword("");
    setIsChanged(false);
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
          Выход
        </Button>

        <p className="text mt-20 text_type_main-default text-profile">В этом разделе вы можете изменить свои персональные данные</p>
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
          autoComplete="new-password" 
          onChange={(e) => setPassword(e.target.value)}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />

        <div className={`${styles.buttonGroup} ${isChanged ? styles.active : ""}`}>
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

       <Routes>
        <Route index element={<div />} /> 
        <Route path="orders" element={<ProfileOrdersPage />} />
        <Route path="orders/:id" element={<ProfileOrderPage />} />
      </Routes>


      <Outlet />
    </div>
  );
}
