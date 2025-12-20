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
import { FeedPage } from "../../pages/Feed/FeedPage";
import { FeedOrderPage } from "../../pages/Feed/FeedOrderPage";
import { ProfileForm } from "../../pages/Profile/ProfileForm";
import ProfileOrderPage from "../../pages/Profile/ProfileOrderPage";
import ProfileOrdersPage from "../../pages/Profile/ProfileOrdersPage";
import IngredientPage from "../../pages/IngredientPage/IngredientPage";
import { OrderModal } from "../modal/OrderModal";
import { OrderDetails } from "../order-details/OrderDetails";

import { ProtectedRouteElement } from "../../components/routes/ProtectedRouteElement";

import { useOrders } from "../../services/useOrders";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const background = (location.state as { background?: Location })?.background;

  const { items: ingredients, status } = useAppSelector((s) => s.ingredients);
  const auth = useAppSelector((s) => s.auth);
  const { orders } = useOrders(ingredients);

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

  const orderId = location.pathname.split("/")[2];
  const order = orders.find((o) => o._id === orderId);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Routes location={background || location}>
          <Route
            path="/"
            element={
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
            }
          />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/:id" element={<FeedOrderPage />} />

          <Route element={<ProtectedRouteElement onlyUnAuth />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          <Route
            element={<ProtectedRouteElement onlyUnAuth requireForgotPassword />}
          >
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          <Route element={<ProtectedRouteElement />}>
            <Route path="/profile" element={<ProfilePage />}>
              <Route index element={<ProfileForm />} />
              <Route path="orders" element={<ProfileOrdersPage />} />
              <Route path="orders/:id" element={<ProfileOrderPage />} />
            </Route>
          </Route>

          <Route path="/ingredients/:id" element={<IngredientPage />} />
        </Routes>

        {background && ingredient && (
          <Modal title="Детали ингредиента" onClose={() => navigate(-1)}>
            <IngredientDetails ingredient={ingredient} />
          </Modal>
        )}

        {background && location.pathname.startsWith("/feed/") && order && (
          <Modal
            title={
              <p className="text text_type_digits-default">#{order.number}</p>
            }
            onClose={() => navigate(-1)}
          >
            <OrderDetails order={order} />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
