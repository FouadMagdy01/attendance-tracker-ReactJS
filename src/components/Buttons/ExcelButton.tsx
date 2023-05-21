import classes from "./Buttons.module.css";
import { RiFileExcel2Line } from "react-icons/ri";

type ButtonType = "import" | "export";
interface ExcelButtonProps {
  type?: ButtonType;
  className?: any;
  defaultProps?: any;
}

const ExcelButton: React.FC<ExcelButtonProps> = ({
  type,
  className,
  defaultProps,
}) => {
  return (
    <div {...defaultProps} className={`${classes.excelBtn} ${className}`}>
      <RiFileExcel2Line className={classes.whiteIcon} />
      <p className={classes.whiteText}>
        {type === "import"
          ? "import from excel sheet"
          : "export to excel sheet"}
      </p>
    </div>
  );
};

export default ExcelButton;
