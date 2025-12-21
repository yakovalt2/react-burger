import { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "./register-page.module.css";
import { useAppDispatch } from "../../services/store";
import { registerUser } from "../../services/slices/authSlice";

export function RegisterPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await dispatch(
        registerUser({ name, email, password })
      ).unwrap();

      if (result?.success) {
        console.log("Пользователь зарегистрирован:", result.user);
        navigate("/");
      } else {
        setError("Ошибка регистрации");
      }
    } catch (err: unknown) {
      console.error("Ошибка регистрации:", err);
      setError(
        err instanceof Error
          ? err.message
          : typeof err === "string"
          ? err
          : "Ошибка регистрации"
      );
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium center">Регистрация</h2>

        {error && (
          <p className="text text_type_main-default text_color_error center">
            {error}
          </p>
        )}

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
          placeholder="E-mail"
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

        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={loading}
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </Button>

        <p className="text text_type_main-default mt-20 center">
          Уже зарегистрированы?{" "}
          <Link to="/login" className="text_color_accent">
            Войти
          </Link>
        </p>
      </form>
    </div>
  );
}
