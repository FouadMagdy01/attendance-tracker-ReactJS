import React from "react";
import classes from "./LogoWithText.module.css";
import { ReactComponent as AppLogo } from "../../assets/svg/Logo.svg";

interface LogoWithTextProps {
  text?: string;
}

const LogoWithText: React.FC<LogoWithTextProps> = ({ text }) => {
  return (
    <div className={classes.logoWrapper}>
      <AppLogo className={classes.logo} />
      <p className={classes.text}>{text}</p>
    </div>
  );
};

export default LogoWithText;
