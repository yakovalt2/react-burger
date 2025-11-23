import React, { useState } from "react";
import styles from "./reset-password.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { request } from "../../utils/request";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../../services/store";
import { denyResetPassword } from "../../services/slices/resetPasswordSlice";

export function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    request("password-reset/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, token }),
    })
      .then((data) => {
        console.log("Успех /password-reset/reset:", data);
        dispatch(denyResetPassword());
        navigate("/login");
      })
      .catch((err) => console.error("Ошибка:", err));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className='text text_type_main-large'>Введите новый пароль</h1>

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

        <p className="text text_type_main-default">
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
}
