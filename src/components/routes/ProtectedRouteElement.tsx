import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/store";

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  requireForgotPassword?: boolean;
}

export const ProtectedRouteElement: React.FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  requireForgotPassword = false,
}) => {
  const auth = useAppSelector((state) => state.auth);
  const location = useLocation();
  const forgotPasswordEmail = sessionStorage.getItem("forgotPasswordEmail");

  const canReset = useAppSelector((state) => state.resetPassword.canReset);

  if (requireForgotPassword && !canReset) {
    return <Navigate to="/forgot-password" replace />;
  }

  if (onlyUnAuth && auth.user) {
    return <Navigate to="/" replace />;
  }

  if (!onlyUnAuth && !auth.user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
