import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./profile.module.css";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

export function ProfilePage() {
  const [name, setName] = useState("Имя");
  const [email, setEmail] = useState("email@example.com");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <NavLink
          to="/profile"
          end
          className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}
        >
          Профиль
        </NavLink>

        <NavLink
          to="/profile/"
          className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}
        >
          История заказов
        </NavLink>

        <p className={styles.link}>Выход</p>
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
          <Button htmlType="button" type="primary" size="medium">
            Сохранить
          </Button>
          <Button htmlType="button" type="secondary" size="medium">
            Отмена
          </Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
