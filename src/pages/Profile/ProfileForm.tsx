import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { getUser, updateUser } from "../../services/slices/authSlice";

export function ProfileForm() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <>
      <Input
        type="text"
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      />

      <Input
        type="email"
        placeholder="Логин"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      />

      <Input
        type="password"
        placeholder="Пароль"
        value={password}
        autoComplete="new-password"
        onChange={(e) => setPassword(e.target.value)}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      />

      <div
        className={`${styles.buttonGroup} ${isChanged ? styles.active : ""}`}
      >
        <Button
          htmlType="button"
          type="primary"
          onClick={handleSave}
          disabled={!name || !email}
        >
          Сохранить
        </Button>

        <Button htmlType="button" type="secondary" onClick={handleCancel}>
          Отмена
        </Button>
      </div>
    </>
  );
}
