import React, { useState } from "react";
import styles from "./reset-password.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { request } from "../../utils/request";

export function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    request("/password-reset/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, token }),
    })
      .then((data) => {
        console.log("Успех /password-reset/reset:", data);
      })
      .catch((err) => console.error("Ошибка:", err));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Введите новый пароль</h1>

        <Input
          type="password"
          placeholder="Введите новый пароль"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />

        <Input
          type="text"
          placeholder="Введите код из письма"
          value={token}
          name="token"
          onChange={(e) => setToken(e.target.value)}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />

        <Button htmlType="submit">Сохранить</Button>

        <p className={styles.text}>
          Вспомнили пароль? <a href="/login">Войти</a>
        </p>
      </form>
    </div>
  );
}
