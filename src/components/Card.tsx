import React from "react";
import classes from "./Card.module.css";
interface CardProps {
  children?: any;
  classNames?: string;
  defaultProps?: Object;
}

const Card: React.FC<CardProps> = ({ children, classNames, defaultProps }) => {
  return (
    <div {...defaultProps} className={`${classes.card} ${classNames}`}>
      {children}
    </div>
  );
};

export default Card;
