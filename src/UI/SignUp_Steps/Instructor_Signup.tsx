import React, { useState } from "react";
import AuthCard from "../../components/AuthCard";
import SectionTitle from "../../components/SectionTitle";
import classes from "./CardsStyles.module.css";
import Input from "../../components/Input";
import { formStyles } from "../../constants/formStyles";
import Button from "../../components/Button";
import { IconButton, InputAdornment } from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import ErrorCard from "../ErrorCard";
interface InstructorSignup {
  onSignUp?: Function;
  err?: Boolean;
  loading?: Boolean;
}
const InstructorSignup: React.FC<InstructorSignup> = ({
  onSignUp,
  err,
  loading,
}) => {
  const [instructorSignUpData, setInstructorSignUpData] = useState({
    name: {
      value: "",
      isValid: true,
    },
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
    confirmPassword: {
      value: "",
      isValid: true,
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const changePasswordVisibility = () => setShowPassword(!showPassword);

  const changeInputHandler = (
    identifier: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInstructorSignUpData((prev) => {
      return {
        ...prev,
        [identifier]: {
          value: event.target.value,
          isValid: true,
        },
      };
    });
  };

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*[^\s]).{8,}$/;

    const nameIsValid = instructorSignUpData.name.value.trim().length > 4;
    const emailIsValid = emailRegex.test(instructorSignUpData.email.value);
    const passwordIsValid = passwordRegex.test(
      instructorSignUpData.password.value
    );
    const confirmPasswordIsValid =
      passwordRegex.test(instructorSignUpData.confirmPassword.value) &&
      instructorSignUpData.password.value ===
        instructorSignUpData.confirmPassword.value;

    if (
      !nameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !confirmPasswordIsValid
    ) {
      return setInstructorSignUpData((prev) => {
        return {
          name: {
            value: nameIsValid ? prev.name.value : "",
            isValid: nameIsValid,
          },
          email: {
            value: emailIsValid ? prev.email.value : "",
            isValid: emailIsValid,
          },
          password: {
            value: passwordIsValid ? prev.password.value : "",
            isValid: passwordIsValid,
          },
          confirmPassword: {
            value: confirmPasswordIsValid ? prev.confirmPassword.value : "",
            isValid: confirmPasswordIsValid,
          },
        };
      });
    }

    const signUpData = {
      name: instructorSignUpData.name.value,
      email: instructorSignUpData.email.value,
      password: instructorSignUpData.password.value,
    };

    onSignUp && onSignUp(signUpData);
  };

  return (
    <AuthCard>
      <SectionTitle
        className={classes.cardTitle}
        sectionTitle="Sign Up as an instructor"
      />
      <p className={classes.subTitle}>Fill up your account information</p>
      {err && (
        <ErrorCard
          className={classes.errCard}
          errorMessage="Sign Up failed, email already exists"
        />
      )}
      <form onSubmit={onFormSubmit} style={styles.form}>
        <Input
          sxStyles={styles.input}
          inputConfigProps={{
            label: "Full Name",
            value: instructorSignUpData.name.value,
            onChange: changeInputHandler.bind(this, "name"),
            error: !instructorSignUpData.name.isValid,
            helperText: instructorSignUpData.name.isValid
              ? null
              : "Please enter a valid name",
          }}
        />
        <Input
          sxStyles={styles.input}
          inputConfigProps={{
            label: "Email",
            value: instructorSignUpData.email.value,
            onChange: changeInputHandler.bind(this, "email"),
            error: !instructorSignUpData.email.isValid,
            helperText: instructorSignUpData.email.isValid
              ? null
              : "Please enter a valid email",
          }}
        />
        <Input
          sxStyles={styles.input}
          inputConfigProps={{
            label: "Password",
            value: instructorSignUpData.password.value,
            onChange: changeInputHandler.bind(this, "password"),
            type: showPassword ? "text" : "password",
            error: !instructorSignUpData.password.isValid,
            helperText: instructorSignUpData.password.isValid
              ? null
              : "Please choose a strong password",
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={changePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        <Input
          sxStyles={styles.input}
          inputConfigProps={{
            type: "password",
            label: "Confirm Password",
            value: instructorSignUpData.confirmPassword.value,
            onChange: changeInputHandler.bind(this, "confirmPassword"),
            error: !instructorSignUpData.confirmPassword.isValid,
            helperText: instructorSignUpData.confirmPassword.isValid
              ? null
              : "Passwords don't match",
          }}
        />
        <Button
          buttonConfigProps={{
            type: "submit",
            loading: loading,
          }}
          sxStyles={styles.button}
          buttonLabel="Sign Up"
        />
      </form>
    </AuthCard>
  );
};
const styles = {
  input: formStyles.input,
  button: {
    ...formStyles.button,
    marginBottom: "30px",
  },
  form: {
    width: "100%",
  },
};
export default InstructorSignup;
