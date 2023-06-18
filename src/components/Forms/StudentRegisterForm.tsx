import React, { useState } from "react";
import classes from "./StudentRegisterForm.module.css";
import { TextField } from "@mui/material";
import Dropdown from "../Input/Dropdown";
import { semesterOptions, yearsOptions } from "../../constants/options";
import Button from "../Buttons/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styles } from "../../constants/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ErrorCard from "../Cards/ErrorCard";
interface formProps {
  defaultValues?: any;
  editable?: Boolean;
  onCancel?: any;
  onSubmit?: any;
  isLoading?: any;
}

const StudentRegisterForm: React.FC<formProps> = ({
  defaultValues,
  editable,
  isLoading,
  onCancel,
  onSubmit,
}) => {
  const [studentData, setStudentData] = useState({
    name: defaultValues ? defaultValues.name : "",
    password: defaultValues ? "" : undefined,
    studentId: defaultValues ? defaultValues.studentId : "",
    email: defaultValues ? defaultValues.email : "",
    semester: defaultValues ? defaultValues.semester : "",
    academicYear: defaultValues ? defaultValues.academicYear : "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [invalidData, setInvalidData] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const changeInputHandler = (
    inputIdentifier: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    return setStudentData((prev) => {
      return {
        ...prev,
        [inputIdentifier]: event.target.value,
      };
    });
  };

  const submitFormHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameIsValid = studentData.name.length > 4;
    const studentIdISValid = !isNaN(studentData.studentId);
    const emailIsValid = studentData.email.length > 4;
    if (!nameIsValid || !emailIsValid || !studentIdISValid) {
      return setInvalidData(true);
    }
    const formData = {
      email: studentData.email,
      name: studentData.name,
      year: studentData.academicYear,
      semester: studentData.semester,
      studentId: parseInt(studentData.studentId),
    };
    setInvalidData(false);
    onSubmit && onSubmit(formData);
  };
  return (
    <div>
      {invalidData && (
        <ErrorCard className={classes.errorCard} errorMessage="Invalid Data" />
      )}
      <form onSubmit={submitFormHandler} className={classes.form}>
        <TextField
          disabled={!editable}
          className={classes.input}
          value={studentData.name}
          onChange={changeInputHandler.bind(this, "name")}
          id="outlined-disabled"
          label="Student Name"
          variant={editable ? "outlined" : "filled"}
        />
        <TextField
          disabled={!editable}
          className={classes.input}
          value={studentData.email}
          onChange={changeInputHandler.bind(this, "email")}
          id="outlined-disabled"
          label="Student Email"
          variant={editable ? "outlined" : "filled"}
        />
        <TextField
          disabled={!editable}
          value={studentData.studentId}
          onChange={changeInputHandler.bind(this, "studentId")}
          className={classes.input}
          id="outlined-disabled"
          label="Student ID"
          variant={editable ? "outlined" : "filled"}
        />
        {!defaultValues && (
          <TextField
            type={showPassword ? "text" : "password"}
            value={studentData.password}
            onChange={changeInputHandler.bind(this, "password")}
            className={classes.input}
            id="outlined-disabled"
            label="Account Password"
            variant={"outlined"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        <Dropdown
          dropdownItems={yearsOptions}
          dropdownLabel="Academic Year"
          selectConfigProps={{
            size: "medium",
            defaultValue: "",
            value: studentData.academicYear,
            onChange: changeInputHandler.bind(this, "academicYear"),
          }}
          labelProps={{
            size: "medium",
          }}
          formControlConfigProps={{
            fullWidth: false,
            className: classes.input,
            sx: {},
            disabled: !editable,
          }}
        />
        <Dropdown
          dropdownItems={semesterOptions}
          dropdownLabel="Semester"
          labelProps={{
            size: "medium",
          }}
          selectConfigProps={{
            size: "medium",
            defaultValue: "",
            value: studentData.semester,
            onChange: changeInputHandler.bind(this, "semester"),
          }}
          formControlConfigProps={{
            fullWidth: false,
            className: classes.input,

            sx: {},
            disabled: !editable,
          }}
        />
        {editable && (
          <div className={classes.formFooter}>
            <Button
              sxStyles={formStyles.cancelBtn}
              buttonLabel="Cancel"
              buttonConfigProps={{
                onClick: onCancel,
              }}
            />
            <Button
              sxStyles={formStyles.confirmBtn}
              buttonLabel="Save Changes"
              buttonConfigProps={{
                type: "submit",
                loading: isLoading,
              }}
            />
          </div>
        )}
      </form>
    </div>
  );
};

const formStyles = {
  confirmBtn: {
    ...styles.button,
    backgroundColor: "#657ea6",
    "&:hover": {
      backgroundColor: "#304566",
    },
  },
  cancelBtn: {
    ...styles.button,

    backgroundColor: "#dce0e6",
    "&:hover": {
      backgroundColor: "#bbc1c9",
    },

    color: "#304566",
  },
};

export default StudentRegisterForm;
