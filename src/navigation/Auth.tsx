import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/AuthPages/Login";
import SignUpPage from "../pages/AuthPages/SignUp";
const AuthNavigator = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<SignUpPage />} />
    </Routes>
  );
};

export default AuthNavigator;
