import classes from "./Buttons.module.css";
import { RiFileExcel2Line } from "react-icons/ri";

type ButtonType = "import" | "export";
interface ExcelButtonProps {
  type?: ButtonType;
  className?: any;
  defaultProps?: any;
  additionalText?: String;
}

const ExcelButton: React.FC<ExcelButtonProps> = ({
  type,
  className,
  defaultProps,
  additionalText,
}) => {
  return (
    <div {...defaultProps} className={`${classes.excelBtn} ${className}`}>
      <RiFileExcel2Line className={classes.whiteIcon} />
      <p className={classes.whiteText}>
        {additionalText}
        {type === "import"
          ? "import from excel sheet"
          : "export to excel sheet"}
      </p>
    </div>
  );
};

export default ExcelButton;
