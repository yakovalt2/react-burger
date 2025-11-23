import { useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import { useAppDispatch } from "../../services/store";
import { loginUser } from "../../services/slices/authSlice";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      navigate("/");
    } catch (err: any) {
      console.error("Ошибка входа:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium center">Вход</h2>

        {error && (
          <p className="text text_type_main-default text_color_error center">
            Неправильный логин или пароль
          </p>
        )}

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
          {loading ? "Вход..." : "Войти"}
        </Button>

        <p className="text text_type_main-default text_color_inactive center">
          Вы — новый пользователь?{" "}
          <Link to="/register" className="text_color_accent">
            Зарегистрироваться
          </Link>
        </p>

        <p className="text text_type_main-default text_color_inactive center">
          Забыли пароль?{" "}
          <Link to="/forgot-password" className="text_color_accent">
            Восстановить пароль
          </Link>
        </p>
      </form>
    </div>
  );
}
