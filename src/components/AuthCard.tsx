import React from "react";
import Card from "./Card";
import classes from "./AuthCard.module.css";
interface AuthCardProps {
  children?: any;
}
const AuthCard: React.FC<AuthCardProps> = ({ children }) => {
  return (
    <Card classNames={classes.loginCardContainer}>
      <div className={classes.loginCardWrapper}>{children}</div>
    </Card>
  );
};

export default AuthCard;
