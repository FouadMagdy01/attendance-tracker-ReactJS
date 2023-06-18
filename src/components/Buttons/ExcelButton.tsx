import classes from "./Buttons.module.css";
import { RiFileExcel2Line } from "react-icons/ri";

type ButtonType = "import" | "export";
interface ExcelButtonProps {
  type?: ButtonType;
  className?: any;
  defaultProps?: any;
  additionalText?: String;
  onUpload?: any;
}

const ExcelButton: React.FC<ExcelButtonProps> = ({
  type,
  className,
  defaultProps,
  additionalText,
  onUpload,
}) => {
  return (
    <>
      {type === "import" && (
        <input
          accept=".xlsx,.xls"
          type="file"
          id="actual-btn"
          hidden
          onChange={onUpload}
        />
      )}
      <label
        {...defaultProps}
        htmlFor="actual-btn"
        className={`${classes.excelBtn} ${className}`}
      >
        <RiFileExcel2Line className={classes.whiteIcon} />
        <p className={classes.whiteText}>
          {additionalText}
          {type === "import"
            ? "import from excel sheet"
            : "export to excel sheet"}
        </p>
      </label>
    </>
  );
};

export default ExcelButton;
