import classes from "./Buttons.module.css";
import { MdCalculate } from "react-icons/md";
interface CalculateBtnProps {
  title?: String;
  className?: any;
  defaultProps?: any;
}

const CalculateButton: React.FC<CalculateBtnProps> = ({
  title,
  defaultProps,
  className,
}) => {
  return (
    <div {...defaultProps} className={`${classes.calculateBtn} ${className}`}>
      <MdCalculate className={classes.blackIcon} />
      <p className={classes.blackText}>{title}</p>
    </div>
  );
};

export default CalculateButton;
