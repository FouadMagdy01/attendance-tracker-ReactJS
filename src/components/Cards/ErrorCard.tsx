import React from "react";
import classes from "./ErrorCard.module.css";
import { ReactComponent as WarningTriangle } from "../../assets/svg/warningTriangle.svg";
interface CardProps {
  className?: any;
  defaultProps?: any;
  errorMessage?: String;
}

const ErrorCard: React.FC<CardProps> = ({
  className,
  defaultProps,
  errorMessage,
}) => {
  return (
    <div {...defaultProps} className={`${classes.card} ${className}`}>
      <WarningTriangle className={classes.warningTriangle} />
      <p className={classes.errorText}>{errorMessage}</p>
    </div>
  );
};

export default ErrorCard;
