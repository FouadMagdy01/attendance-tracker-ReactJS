import classes from "./Login.module.css";
import React, { useState } from "react";
import LoginForm from "../../components/Forms/LoginForm";
import LogoWithText from "../../components/LogoWithText/LogoWithText";
import api from "../../services/apis/api";
import { signIn } from "../../store/authSlice/reducers/signIn";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { SignInData } from "../../interfaces/signInData";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const loginHandler = async (signInData: SignInData) => {
    dispatch(
      signIn({
        authType: signInData.authType,
        email: signInData.email,
        password: signInData.password,
      })
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <LogoWithText text={`THE OPTIMIZED WORKFLOW\nOUT OF THE BOX`} />
        <LoginForm
          err={auth.err}
          isLoading={auth.signingIn}
          onLogin={loginHandler}
        />
      </div>
    </div>
  );
};

export default LoginPage;
