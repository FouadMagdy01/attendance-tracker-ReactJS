import React from "react";
import { LoadingButton } from "@mui/lab";
interface ButtonProps {
  buttonConfigProps?: Object;
  buttonLabel?: any;
  sxStyles?: any;
}

const Button: React.FC<ButtonProps> = ({
  buttonLabel,
  buttonConfigProps,
  sxStyles,
}) => {
  return (
    <LoadingButton
      sx={{
        fontFamily: "Rubik",
        fontWeight: 500,
        fontSize: 14,
        ...sxStyles,
      }}
      variant="contained"
      {...buttonConfigProps}
    >
      {buttonLabel}
    </LoadingButton>
  );
};

export default Button;
