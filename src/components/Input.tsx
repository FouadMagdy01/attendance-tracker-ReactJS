import React from "react";
import { TextField } from "@mui/material";
import classes from "./Input.module.css";
interface InputProps {
  inputConfigProps?: any;
  sxStyles?: any;
  inputTitle?: any;
}

const Input: React.FC<InputProps> = ({
  inputConfigProps,
  sxStyles,
  inputTitle,
}) => {
  return (
    <>
      {inputTitle && <span className={classes.inputTitle}>{inputTitle}</span>}
      <TextField
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#D9DBDE",
              borderWidth: "2px",
              borderRadius: "4px",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#4c84ff",
              borderWidth: "2px",
            },
            "&:hover:not(.Mui-focused) fieldset": {
              borderColor: "#D9DBDE",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#D9DBDE",
            "&.Mui-focused": {
              color: "#4c84ff",
            },
          },
          ...sxStyles,
        }}
        {...inputConfigProps}
      />
    </>
  );
};

export default Input;
