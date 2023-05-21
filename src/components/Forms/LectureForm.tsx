import React, { useState } from "react";
import { DatePicker, Space } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import classes from "./LectureForm.module.css";
import SectionTitle from "../SectionTitle/SectionTitle";
import Input from "../Input/Input";
import { formStyles } from "../../constants/formStyles";
import Dropdown from "../Input/Dropdown";
import Button from "../Buttons/Button";

interface LectureFormProps {
  defaultValues?: any;
  onsubmit?: any;
  subjectId?: String;
  loading?: Boolean;
}
const LectureForm: React.FC<LectureFormProps> = ({
  defaultValues,
  onsubmit,
  subjectId,
  loading,
}) => {
  const lectureOptions = [
    {
      value: "Lecture",
      label: "Lecture",
    },
    {
      value: "Section",
      label: "Section",
    },
  ];
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const [lectureData, setLectureData] = useState({
    type: {
      value: defaultValues ? defaultValues.type : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date : null,
      isValid: true,
    },
    name: {
      value: defaultValues ? defaultValues.name : "",
      isValid: true,
    },
    location: {
      value: defaultValues ? defaultValues.location : "",
      isValid: true,
    },
  });

  const changeDateHandler = (value: DatePickerProps["value"]) => {
    setLectureData((prev) => {
      return {
        ...prev,
        date: {
          value,
          isValid: true,
        },
      };
    });
  };

  const changeInputHandler = (
    inputIdentifier: any,
    event: React.ChangeEvent<HTMLInputElement> | any
  ) => {
    setLectureData((prev) => {
      return {
        ...prev,
        [inputIdentifier]: {
          value: event.target.value,
          isValid: true,
        },
      };
    });
  };

  const onFormSubmit: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const dateIsValid =
      dayjs.isDayjs(lectureData.date.value) &&
      dayjs().diff(dayjs(lectureData.date.value)) < 0;
    const nameIsValid = lectureData.name.value.length > 3;
    const typeIsValid = lectureData.type.value.length != 0;
    const locationIsValid = lectureData.location.value.length > 3;
    if (!dateIsValid || !nameIsValid || !typeIsValid || !locationIsValid) {
      return setLectureData((prev) => {
        return {
          name: {
            value: prev.name.value,
            isValid: nameIsValid,
          },
          location: {
            value: prev.location.value,
            isValid: locationIsValid,
          },
          type: {
            value: prev.type.value,
            isValid: typeIsValid,
          },
          date: {
            value: prev.date.value,
            isValid: dateIsValid,
          },
        };
      });
    }
    const formData = {
      name: lectureData.name.value,
      type: lectureData.type.value,
      location: lectureData.location.value,
      date: lectureData.date.value,
      subjectId: defaultValues ? defaultValues.subject : subjectId,
      lectureId: defaultValues ? defaultValues._id : undefined,
    };
    onsubmit && onsubmit(formData);
    setLectureData((perv) => {
      return {
        name: {
          value: "",
          isValid: true,
        },
        location: {
          value: "",
          isValid: true,
        },
        date: {
          value: null,
          isValid: true,
        },
        type: {
          value: "",
          isValid: true,
        },
      };
    });
  };
  return (
    <div>
      <SectionTitle
        sectionTitle={
          defaultValues ? "Edit lecture details" : "Schedule a new lecture"
        }
      />
      <form onSubmit={onFormSubmit} className={classes.lectureForm}>
        <Input
          inputConfigProps={{
            label: "Lecture name",
            value: lectureData.name.value,
            onChange: changeInputHandler.bind(this, "name"),
            error: !lectureData.name.isValid,
            helperText: lectureData.name.isValid
              ? null
              : "lecture name should contain at least 4 characters",
          }}
          sxStyles={formStyles.input}
        />
        <Input
          inputConfigProps={{
            label: "Location",
            value: lectureData.location.value,
            onChange: changeInputHandler.bind(this, "location"),
            error: !lectureData.location.isValid,
            helperText: lectureData.name.isValid
              ? null
              : "Please enter a valid location",
          }}
          sxStyles={formStyles.input}
        />
        <Dropdown
          dropdownLabel="Lecture type"
          formControlConfigProps={{
            error: !lectureData.type.isValid,
          }}
          selectConfigProps={{
            onChange: changeInputHandler.bind(this, "type"),
            value: lectureData.type.value,
            error: !lectureData.type.isValid,
          }}
          helperText={lectureData.type.isValid ? null : "Please select a type"}
          dropdownItems={lectureOptions}
        />
        <DatePicker
          className={classes.datePicker}
          size="large"
          status={lectureData.date.isValid ? undefined : "error"}
          format="YYYY-MM-DD HH:mm"
          showTime
          value={lectureData.date.value}
          onChange={changeDateHandler}
        />
        <Button
          buttonConfigProps={{
            type: "submit",
            loading,
          }}
          sxStyles={styles.saveButton}
          buttonLabel={defaultValues ? "Submit Changes" : "Create Lecture"}
        />
        {defaultValues && (
          <Button
            sxStyles={styles.deleteButton}
            buttonConfigProps={{
              color: "error",
              variant: "outlined",
            }}
            buttonLabel="Delete Subject"
          />
        )}
      </form>
    </div>
  );
};

const styles = {
  deleteButton: {
    textTransform: "none",
    height: "50px",
    mt: "10px",
    width: "100%",
  },
  saveButton: {
    ...formStyles.button,
    backgroundColor: "#172037",
    ":hover": {
      backgroundColor: "#485066",
    },
  },
};
export default LectureForm;
