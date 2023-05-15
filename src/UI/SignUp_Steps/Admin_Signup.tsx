import React, { useState } from "react";
import AuthCard from "../../components/AuthCard";
import SectionTitle from "../../components/SectionTitle";
import classes from "./CardsStyles.module.css";
import Button from "../../components/Button";
import { formStyles } from "../../constants/formStyles";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import { faculties } from "../../constants/faculties";
import { IconButton, InputAdornment } from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import ErrorCard from "../ErrorCard";

interface Step_two_props {
  onSignUp?: Function;
  err?: Boolean;
  loading?: Boolean;
}

const AdminSignup: React.FC<Step_two_props> = ({ onSignUp, err, loading }) => {
  const [adminSignUpData, setAdminSignUpData] = useState({
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
    orgPassword: {
      value: "",
      isValid: true,
    },
    faculty: {
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
    setAdminSignUpData((prev) => {
      return {
        ...prev,
        [identifier]: {
          value: event.target.value,
          isValid: true,
        },
      };
    });
  };

  const submitFormHandler: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&])(?=.*[^\s]).{8,}$/;

    const emailIsValid = emailRegex.test(adminSignUpData.email.value);
    const passwordIsValid = passwordRegex.test(adminSignUpData.password.value);
    const confirmPasswordIsValid =
      passwordRegex.test(adminSignUpData.confirmPassword.value) &&
      adminSignUpData.confirmPassword.value === adminSignUpData.password.value;
    const facultyIsValid = adminSignUpData.faculty.value.trim().length > 0;
    const orgPasswordIsValid =
      adminSignUpData.orgPassword.value.trim().length > 0;
    if (
      !emailIsValid ||
      !passwordIsValid ||
      !confirmPasswordIsValid ||
      !facultyIsValid ||
      !orgPasswordIsValid
    ) {
      return setAdminSignUpData((prev) => {
        return {
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
          faculty: {
            value: facultyIsValid ? prev.faculty.value : "",
            isValid: facultyIsValid,
          },
          orgPassword: {
            value: orgPasswordIsValid ? prev.orgPassword.value : "",
            isValid: orgPasswordIsValid,
          },
        };
      });
    }

    const signUpDataObject = {
      email: adminSignUpData.email.value,
      password: adminSignUpData.password.value,
      faculty: adminSignUpData.faculty.value,
      orgPassword: adminSignUpData.orgPassword.value,
    };

    onSignUp && onSignUp(signUpDataObject);
  };

  return (
    <AuthCard>
      <SectionTitle
        className={classes.cardTitle}
        sectionTitle="Sign Up as an admin"
      />
      <p className={classes.subTitle}>Fill up your account information</p>
      {err && (
        <ErrorCard
          className={classes.errCard}
          errorMessage="Sign Up failed, email already exists"
        />
      )}
      <form style={styles.form} onSubmit={submitFormHandler}>
        <Input
          inputConfigProps={{
            label: "Enter your email",
            value: adminSignUpData.email.value,
            onChange: changeInputHandler.bind(this, "email"),
            error: !adminSignUpData.email.isValid,
            helperText: adminSignUpData.email.isValid
              ? null
              : "Please enter valid email",
          }}
          sxStyles={styles.input}
        />
        <Input
          inputConfigProps={{
            label: "Enter your password",
            value: adminSignUpData.password.value,
            onChange: changeInputHandler.bind(this, "password"),
            error: !adminSignUpData.password.isValid,
            type: showPassword ? "text" : "password",
            helperText: adminSignUpData.password.isValid
              ? null
              : "Please enter strong password",
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
          sxStyles={styles.input}
        />
        <Input
          inputConfigProps={{
            label: "Confirm your password",
            value: adminSignUpData.confirmPassword.value,
            type: "password",
            onChange: changeInputHandler.bind(this, "confirmPassword"),
            error: !adminSignUpData.confirmPassword.isValid,
            helperText: adminSignUpData.confirmPassword.isValid
              ? null
              : "Password don't match",
          }}
          sxStyles={styles.input}
        />
        <Input
          inputConfigProps={{
            label: "Enter organization password",
            value: adminSignUpData.orgPassword.value,
            onChange: changeInputHandler.bind(this, "orgPassword"),
            error: !adminSignUpData.orgPassword.isValid,
            type: showPassword ? "text" : "password",
            helperText: adminSignUpData.orgPassword.isValid
              ? null
              : "Please enter strong password",
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
          sxStyles={styles.input}
        />
        <Dropdown
          dropdownItems={faculties}
          dropdownLabel="Choose a faculty"
          formControlConfigProps={{
            error: !adminSignUpData.faculty.isValid,
          }}
          helperText={
            adminSignUpData.faculty.isValid ? null : "Please choose a faculty"
          }
          selectConfigProps={{
            value: adminSignUpData.faculty.value,
            onChange: changeInputHandler.bind(this, "faculty"),
            error: !adminSignUpData.faculty.isValid,
          }}
        />
        <Button
          sxStyles={styles.button}
          buttonLabel="Sign Up"
          buttonConfigProps={{
            type: "submit",
            loading: loading,
          }}
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

export default AdminSignup;
