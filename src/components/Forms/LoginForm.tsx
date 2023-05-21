import React, { useState } from "react";
import Button from "../Buttons/Button";
import Input from "../Input/Input";
import classes from "./LoginForm.module.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import ErrorCard from "../Cards/ErrorCard";
import { Link } from "react-router-dom";
import AuthCard from "../Cards/AuthCard";
import { Button as CT, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { formStyles } from "../../constants/formStyles";
import Dropdown from "../Input/Dropdown";
import { SignInData } from "../../interfaces/signInData";
interface LoginCardProps {
  onLogin?: Function;
  isLoading?: Boolean;
  err?: Boolean;
}

const LoginForm: React.FC<LoginCardProps> = ({ onLogin, isLoading, err }) => {
  const roles = [
    {
      label: "Instructor",
      value: "Instructor",
    },
    {
      label: "Admin",
      value: "Admin",
    },
  ];

  const [authType, setAuthType] = useState<String>("Admin");
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
  });

  const changeTypeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue !== authType) {
      setAuthType(newValue);
      setLoginData((prev) => {
        return {
          email: {
            value: "",
            isValid: true,
          },
          password: {
            value: "",
            isValid: true,
          },
        };
      });
    }
  };

  const changeInputHandler = (
    identifier: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginData((prev) => {
      return {
        ...prev,
        [identifier]: {
          value: event.target.value,
          isValid: true,
        },
      };
    });
  };

  const changePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailIsValid = loginData.email.value.trim().length > 0;
    const passwordIsValid = loginData.password.value.trim().length > 0;

    if (!emailIsValid || !passwordIsValid) {
      return setLoginData((prev) => {
        return {
          email: {
            ...prev.email,
            isValid: emailIsValid,
          },
          password: {
            ...prev.password,
            isValid: passwordIsValid,
          },
        };
      });
    }

    const signInData: SignInData = {
      email: loginData.email.value,
      password: loginData.password.value,
      authType: authType,
    };

    onLogin && onLogin(signInData);
  };

  return (
    <AuthCard>
      <SectionTitle className={classes.cardTitle} sectionTitle="Login" />
      {err && (
        <ErrorCard
          className={classes.errorCard}
          errorMessage="Please make sure you have the correct email or password."
        />
      )}
      <form onSubmit={submitFormHandler}>
        <Dropdown
          dropdownItems={roles}
          selectConfigProps={{
            value: authType,
            onChange: changeTypeHandler,
          }}
          dropdownLabel="Role"
        />
        <Input
          sxStyles={formStyles.input}
          inputConfigProps={{
            label: "Email",
            value: loginData.email.value,
            onChange: changeInputHandler.bind(this, "email"),
            error: !loginData.email.isValid,
          }}
        />

        <Input
          sxStyles={formStyles.input}
          inputConfigProps={{
            label: "Password",
            value: loginData.password.value,
            onChange: changeInputHandler.bind(this, "password"),
            error: !loginData.password.isValid,
            type: showPassword ? "text" : "password",
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={changePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          buttonConfigProps={{
            type: "submit",
            loading: isLoading,
          }}
          sxStyles={formStyles.button}
          buttonLabel="Login"
        />
      </form>
      <div className={classes.loginHelpers}>
        <span className={classes.loginHelper_btn}>I forgot my password</span>
        <Link className={classes.loginHelper_btn} to="/register">
          I don't have account
        </Link>
      </div>
    </AuthCard>
  );
};

export default LoginForm;
