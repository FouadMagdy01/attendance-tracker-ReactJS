import React from "react";
import AuthCard from "../../components/Cards/AuthCard";
import classes from "./CardsStyles.module.css";
import { ReactComponent as SuccessTick } from "../../assets/svg/SuccessTick.svg";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { NavLink } from "react-router-dom";

const SignupSuccess = () => {
  return (
    <AuthCard>
      <SectionTitle
        className={classes.cardTitle}
        sectionTitle=" You account is ready!"
      />
      <SuccessTick className={classes.logo} />
      <p className={classes.subTitle}>
        Your account has been created successfully
      </p>
      <NavLink className={classes.loginHelper_btn} to="/login">
        Go to login page
      </NavLink>
    </AuthCard>
  );
};

export default SignupSuccess;
