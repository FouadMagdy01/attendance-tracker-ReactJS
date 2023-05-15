import { Divider, Spin } from "antd";
import Input from "./Input";
import { SlTrash } from "react-icons/sl";
import { FaPlus } from "react-icons/fa";
import React, { useState } from "react";
import Card from "./Card";
import { useEffect } from "react";
import classes from "./SubjectForm.module.css";
import { formStyles } from "../constants/formStyles";
import Button from "./Button";
import InstructorAssignTable from "../UI/InstructorAssignTable";
import api from "../services/api";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import Dropdown from "./Dropdown";
import { semesterOptions, yearsOptions } from "../constants/options";
import { useNavigate } from "react-router-dom";
import { displayMessage } from "../store/messageSlice/message";
import ErrorCard from "../UI/ErrorCard";
interface SubjectFormProps {
  formWrapperProps?: any;
  defaultValues?: any;
  onSubmit?: any;
}

const AddSubjectForm: React.FC<SubjectFormProps> = ({
  formWrapperProps,
  defaultValues,
  onSubmit,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);

  const { subjectObject } = useAppSelector((state) => state.subject);
  const [instructorsModalOpened, setInstructorsModalOpened] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [removingInstructor, setRemovingInstructor] = useState({
    loading: false,
    id: "",
  });
  const [subjectData, setSubjectData] = useState({
    name: {
      value: defaultValues ? defaultValues.name : "",
      isValid: true,
    },
    semester: {
      value: defaultValues ? defaultValues.semester : "",
      isValid: true,
    },
    year: {
      value: defaultValues ? defaultValues.year : "",
      isValid: true,
    },
    assignedInstructors: {
      value: defaultValues ? defaultValues.instructors : [],
      isValid: true,
    },
  });

  const changeInputHandler = (
    inputIdentifier: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubjectData((prev) => {
      return {
        ...prev,
        [inputIdentifier]: {
          value: event.target.value,
          isValid: true,
        },
      };
    });
  };

  const instructorsChangeHandler = async (changeType: any, arg: any) => {
    // changeType may be "assign" or "remove"
    if (changeType === "assign") {
      //arg in this case is array of assigned instructors ids
      //---- get the corresponding instructor objects from the api data
      const newInstructors = instructors.filter((instructor: any) =>
        arg.includes(instructor._id)
      );

      //----return a new set of instructors in order to prevent duplicated instructors
      const updatedInstructorsList = new Set([
        ...subjectData.assignedInstructors.value,
        ...newInstructors,
      ]);
      const finalList = [...updatedInstructorsList];

      setSubjectData((prev) => {
        return {
          ...prev,
          ["assignedInstructors"]: {
            value: finalList,
            isValid: true,
          },
        };
      });
      dispatch(
        displayMessage({
          type: "success",
          context: "instructors was assigned successfully",
          duration: 5,
        })
      );
    } else {
      const filteredInstructorsList =
        subjectData.assignedInstructors.value.filter((e: any) => e._id != arg);
      setSubjectData((prev) => {
        return {
          ...prev,
          ["assignedInstructors"]: {
            value: filteredInstructorsList,
            isValid: true,
          },
        };
      });
      dispatch(
        displayMessage({
          type: "success",
          context: "instructors was removed successfully",
          duration: 5,
        })
      );
    }
  };

  const removeInstructor = async (instructorId: any) => {
    setRemovingInstructor((prev) => {
      return {
        loading: true,
        id: instructorId,
      };
    });
    try {
      const response = await api.delete("/admin/removeInstructorAssignment", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        data: {
          instructorId,
          subjectId: subjectObject._id,
        },
      });
      const updatedInstructorsList =
        subjectData.assignedInstructors.value.filter(
          (instructor: any) => instructor._id != instructorId
        );
      setSubjectData((prev) => {
        return {
          ...prev,
          ["assignedInstructors"]: {
            value: updatedInstructorsList,
            isValid: true,
          },
        };
      });
      dispatch(
        displayMessage({
          type: "success",
          context: "instructors was removed successfully",
          duration: 5,
        })
      );
    } catch (err) {}

    setRemovingInstructor((prev) => {
      return {
        loading: false,
        id: "",
      };
    });
  };

  const closeModal = () => {
    setInstructorsModalOpened(false);
  };

  const openModal = () => {
    setInstructorsModalOpened(true);
  };

  const getFacultyInstructors = async () => {
    const response = await api.get("/admin/facultyInstructors", {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    setInstructors(response.data);
  };

  const submitFormHandler: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const nameIsValid = subjectData.name.value.trim().length > 3;
    const semesterIsValid = subjectData.semester.value.length > 0;
    const yearIsValid = subjectData.year.value.length > 0;
    const instructorsIsValid = subjectData.assignedInstructors.value.length > 0;
    console.log(semesterIsValid);
    if (
      !instructorsIsValid ||
      !semesterIsValid ||
      !yearIsValid ||
      !nameIsValid
    ) {
      return setSubjectData((prev) => {
        return {
          name: {
            value: prev.name.value,
            isValid: nameIsValid,
          },
          semester: {
            value: prev.semester.value,
            isValid: semesterIsValid,
          },
          year: {
            value: prev.year.value,
            isValid: yearIsValid,
          },
          assignedInstructors: {
            value: prev.assignedInstructors.value,
            isValid: instructorsIsValid,
          },
        };
      });
    }
    const instructorsIds = subjectData.assignedInstructors.value.map(
      (e: any) => e._id
    );
    const formData = {
      subjectName: subjectData.name.value,
      year: subjectData.year.value,
      semester: subjectData.semester.value,
      instructors: instructorsIds,
      subjectId: defaultValues ? defaultValues._id : undefined,
    };
    await onSubmit(formData);
    setSubjectData((prev) => {
      return {
        name: {
          value: "",
          isValid: true,
        },
        semester: {
          value: "",
          isValid: true,
        },
        year: {
          value: "",
          isValid: true,
        },
        assignedInstructors: {
          value: [],
          isValid: true,
        },
      };
    });
  };

  const deleteSubjectHandler = async () => {
    await api.delete("admin/remove-subject", {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
      data: {
        subjectId: defaultValues._id,
      },
    });
    dispatch(
      displayMessage({
        type: "success",
        context: "subject was removed successfully",
        duration: 5,
      })
    );
    navigate("/subjects");
  };

  useEffect(() => {
    getFacultyInstructors();
  }, []);

  return (
    <>
      <InstructorAssignTable
        dataSource={instructors}
        modalOpen={instructorsModalOpened}
        assignType="subject"
        closeModal={closeModal}
        onFinishSelecting={instructorsChangeHandler}
      />
      <Divider orientation="left">Instructors</Divider>
      <div className={classes.instructors}>
        {subjectData.assignedInstructors.value.map((instructor: any) => {
          return (
            <Card key={instructor._id} classNames={classes.instructorItem}>
              {removingInstructor.loading &&
              removingInstructor.id === instructor._id ? (
                <Spin size="small" tip="Removing Instructor"></Spin>
              ) : (
                <>
                  <p className={classes.instructorName}>{instructor.name}</p>
                  <SlTrash
                    onClick={() => {
                      defaultValues
                        ? removeInstructor(instructor._id)
                        : instructorsChangeHandler("remove", instructor._id);
                    }}
                    className={classes.icon}
                  />
                </>
              )}
            </Card>
          );
        })}
        <Card
          defaultProps={{
            onClick: openModal,
          }}
          classNames={classes.addInstructor}
        >
          <p className={classes.addInstructorText}>Assign Instructor</p>
          <FaPlus className={classes.plusIcon} />
        </Card>
      </div>
      {!subjectData.assignedInstructors.isValid && (
        <ErrorCard
          className={classes.instructorError}
          errorMessage="You should include at least one instructor for the subject"
        />
      )}
      <Divider orientation="left">Subject Information</Divider>
      <form
        onSubmit={submitFormHandler}
        className={classes.subjectForm}
        {...formWrapperProps}
      >
        <Input
          sxStyles={formStyles.input}
          inputConfigProps={{
            label: "Subject Name",
            onChange: changeInputHandler.bind(this, "name"),
            value: subjectData.name.value,
            error: !subjectData.name.isValid,
            helperText: subjectData.name.isValid
              ? null
              : "Subject Name should at least include 3 characters",
          }}
        />
        <Dropdown
          dropdownItems={yearsOptions}
          formControlConfigProps={{
            error: !subjectData.year.isValid,
          }}
          selectConfigProps={{
            onChange: changeInputHandler.bind(this, "year"),
            value: subjectData.year.value,
            error: !subjectData.year.isValid,
          }}
          helperText={subjectData.year.isValid ? null : "Please choose a year"}
          dropdownLabel="Select a year"
        />
        <Dropdown
          dropdownItems={semesterOptions}
          formControlConfigProps={{
            error: !subjectData.semester.isValid,
          }}
          selectConfigProps={{
            onChange: changeInputHandler.bind(this, "semester"),
            value: subjectData.semester.value,
            error: !subjectData.semester.isValid,
          }}
          helperText={
            subjectData.year.isValid ? null : "Please choose a semester"
          }
          dropdownLabel="Select a semester"
        />
        <Button
          sxStyles={styles.saveButton}
          buttonConfigProps={{
            type: "submit",
          }}
          buttonLabel={defaultValues ? "Submit Changes" : "Add Subject"}
        />
        {defaultValues && (
          <Button
            sxStyles={styles.deleteButton}
            buttonConfigProps={{
              onClick: deleteSubjectHandler,
              color: "error",
              variant: "outlined",
            }}
            buttonLabel="Delete Subject"
          />
        )}
      </form>
    </>
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
export default AddSubjectForm;
