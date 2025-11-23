import React, { useState } from "react";
import styles from "./forgot-password.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { request } from "../../utils/request";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch } from "../../services/store";
import { allowResetPassword } from "../../services/slices/resetPasswordSlice";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    request("password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((data) => {
        console.log("Успех /password-reset:", data);
        dispatch(allowResetPassword());
        navigate("/reset-password");
      })
      .catch((err) => console.error("Ошибка:", err));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-large">Восстановление пароля</h1>

        <Input
          type="email"
          placeholder="Укажите e-mail"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        />

        <Button htmlType="submit">Восстановить</Button>

        <p className="text text_type_main-default">
          Вспомнили пароль? <Link to="/login">Войти</Link>
        </p>
      </form>
    </div>
  );
}
