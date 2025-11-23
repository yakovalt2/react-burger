import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "../app-header/AppHeader";
import styles from "./App.module.css";
import BurgerIngredients from "../burger-ingredients/BurgerIngredients";
import BurgerConstructor from "../burger-constructor/BurgerConstructor";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { fetchIngredients } from "../../services/slices/IngredientsSlice";
import { getUser, setAuthChecked } from "../../services/slices/authSlice";
import Modal from "../modal/Modal";
import IngredientDetails from "../ingredient-details/IngredientDetails";

import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { RegisterPage } from "../../pages/RegisterPage/RegisterPage";
import { ForgotPasswordPage } from "../../pages/ForgotPassword/ForgotPassword";
import { ResetPasswordPage } from "../../pages/ResetPassword/ResetPassword";
import { ProfilePage } from "../../pages/Profile/Profile";
import IngredientPage from "../../pages/IngredientPage/IngredientPage";

import { ProtectedRouteElement } from "../../components/routes/ProtectedRouteElement";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { background?: Location };
  const background = state?.background;

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

  const ingredientId = location.pathname.split("/")[2];
  const ingredient = ingredients.find((i) => i._id === ingredientId);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Routes location={background || location}>
          <Route path="/" element={
            <>
              <BurgerIngredients ingredients={ingredients} />
              <BurgerConstructor ingredients={ingredients} />
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route element={<ProtectedRouteElement />}>
            <Route path="/profile/*" element={<ProfilePage />} />
          </Route>

          <Route path="/ingredients/:id" element={<IngredientPage />} />
        </Routes>

        {background && ingredient && (
          <Modal title="Детали ингредиента" onClose={() => navigate(-1)}>
            <IngredientDetails ingredient={ingredient} />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;