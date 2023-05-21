import React from "react";
import classes from "./SectionTitle.module.css";
interface SectionTitleProps {
  sectionTitle?: String;
  defaultProps?: any;
  className?: any;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  sectionTitle,
  defaultProps,
  className,
}) => {
  return (
    <h1 {...defaultProps} className={`${classes.text} ${className}`}>
      {sectionTitle}
    </h1>
  );
};

export default SectionTitle;
