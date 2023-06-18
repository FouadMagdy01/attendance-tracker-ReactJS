import React from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import classes from "./Input.module.css";
import FormHelperText from "@mui/material/FormHelperText";
interface DropdownItem {
  label?: any;
  value?: any;
}

interface DropdownProps {
  dropdownLabel?: String;
  formControlConfigProps?: any;
  sxStyles?: any;
  selectConfigProps?: any;
  dropdownItems?: DropdownItem[] | any;
  menuItemConfigProps?: any;
  dropdownTitle?: any;
  helperText?: String | null;
  labelProps?: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  dropdownLabel,
  formControlConfigProps,
  sxStyles,
  selectConfigProps,
  dropdownItems,
  menuItemConfigProps,
  dropdownTitle,
  helperText,
  labelProps,
}) => {
  return (
    <>
      {dropdownTitle && (
        <span className={classes.inputTitle}>{dropdownTitle}</span>
      )}
      <FormControl
        sx={{
          marginBottom: "25px",
        }}
        fullWidth
        {...formControlConfigProps}
      >
        <InputLabel
          sx={{
            color: "#D9DBDE",
          }}
          size="small"
          id="demo-simple-select-label"
          {...labelProps}
        >
          {dropdownLabel}
        </InputLabel>
        <Select
          size="small"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D9DBDE",
              borderWidth: "2px",
              borderRadius: "4px",
            },
            ...sxStyles,
          }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={dropdownLabel}
          {...selectConfigProps}
        >
          {dropdownItems &&
            dropdownItems.map((item: DropdownItem, index: any) => (
              <MenuItem {...menuItemConfigProps} value={item.value} key={index}>
                {item.label}
              </MenuItem>
            ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </>
  );
};

export default Dropdown;
