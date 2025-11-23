import React, { useEffect } from "react";
import AppHeader from "../app-header/AppHeader";
import styles from "./App.module.css";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchIngredients } from "../../services/slices/IngredientsSlice";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { ForgotPasswordPage } from "../../pages/ForgotPassword/ForgotPassword";
import { ResetPasswordPage } from "../../pages/ResetPassword/ResetPassword";
import { ProfilePage } from "../../pages/Profile/Profile";

function App() {
  const dispatch = useAppDispatch();
  const {
    items: ingredients,
    status,
    error,
  } = useAppSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  if (status === "loading") {
    return <p>Загрузка...</p>;
  }

  if (status === "failed") {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <BurgerIngredients ingredients={ingredients} />
                  <BurgerConstructor ingredients={ingredients} />
                </>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
