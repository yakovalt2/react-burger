import React, { useEffect } from "react";
import AppHeader from "../app-header/AppHeader";
import styles from "./App.module.css";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchIngredients } from "../../services/slices/IngredientsSlice";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { getUser, setAuthChecked } from "../../services/slices/authSlice";

import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { ForgotPasswordPage } from "../../pages/ForgotPassword/ForgotPassword";
import { ResetPasswordPage } from "../../pages/ResetPassword/ResetPassword";
import { ProfilePage } from "../../pages/Profile/Profile";

import { ProtectedRouteElement } from "../../components/routes/ProtectedRouteElement";

function App() {
  const dispatch = useAppDispatch();

  const { items: ingredients, status } = useAppSelector((s) => s.ingredients);
  const auth = useAppSelector((s) => s.auth);

  useEffect(() => {
  const init = async () => {
    try {
      await dispatch(getUser() as any); 
    } finally {
      dispatch(setAuthChecked()); 
    }
  };

  init();
}, [dispatch]);

  useEffect(() => {
    if (auth.isAuthChecked) {
      dispatch(fetchIngredients());
    }
  }, [auth.isAuthChecked, dispatch]);

  if (!auth.isAuthChecked) {
    return <p>Загрузка авторизации...</p>;
  }

  if (status === "loading") {
    return <p>Загрузка ингредиентов...</p>;
  }

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
          <Routes>
            <Route element={<ProtectedRouteElement onlyUnAuth />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Route>

            <Route element={<ProtectedRouteElement />}>
              <Route path="/profile/*" element={<ProfilePage />} />
            </Route>

            <Route
              path="/"
              element={
                <>
                  <BurgerIngredients ingredients={ingredients} />
                  <BurgerConstructor ingredients={ingredients} />
                </>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;