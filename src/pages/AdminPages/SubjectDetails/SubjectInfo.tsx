import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { Divider, Empty, Switch, Typography } from "antd";
import LabelCaption from "../../../components/LabelCaption/LabelCaption";
import classes from "./SubjectDetails.module.css";
import Button from "../../../components/Buttons/Button";
import ErrorOverlay from "../../../UI/ErrorOverloay";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { acceptStudent } from "../../../store/subjectsSlice/reducers/acceptStudent";
import { rejectStudent } from "../../../store/subjectsSlice/reducers/rejectStudent";
import { getSubject } from "../../../store/subjectsSlice/reducers/getSubject";

const SubjectInfo = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const subjectId = params.id;
  const [activeStudents, setActiveStudents] = useState(true);
  const { subjectObject, isLoading } = useAppSelector((state) => state.subject);
  const [query, setQuery] = useState("");
  const columns = [
    {
      title: "Name",
      key: "name",
      render: (_: any, record: any) => record.name,
    },
    {
      title: "Semester",
      key: "semester",
      render: (_: any, record: any) => record.semester,
    },
    {
      title: "Student id",
      key: "studentId",
      render: (_: any, record: any) => record.studentId,
    },
    {
      title: "Year",
      key: "year",
      render: (_: any, record: any) => record.academicYear,
    },
    {
      title: "",
      key: "",
      render: (_: any, record: any) => (
        <Button
          buttonConfigProps={{
            onClick: handleAcceptStudent.bind(this, _._id),
          }}
          sxStyles={styles.acceptBtn}
          buttonLabel="Accept"
        />
      ),
      isSpecial: true,
    },
    {
      title: "",
      key: "",
      render: (_: any, record: any) => (
        <Button
          buttonConfigProps={{
            onClick: handleRejectStudent.bind(this, _._id),
          }}
          sxStyles={styles.rejectBtn}
          buttonLabel="Reject"
        />
      ),
      isSpecial: true,
    },
  ];

  const handleAcceptStudent = async (studentId: any) => {
    dispatch(acceptStudent({ studentId, subjectId }));
  };

  const handleRejectStudent = async (studentId: any) => {
    dispatch(rejectStudent({ studentId, subjectId }));
  };

  const toggleDisplayedStudentsData = () => {
    if (subjectObject) {
      return activeStudents
        ? subjectObject.students.accepted
        : subjectObject.students.pending;
    }
    return [];
  };

  const filteredData = () => {
    const students = toggleDisplayedStudentsData();
    if (query.trim().length === 0) {
      return students;
    }
    const filteredStudents = students.filter((student: any) =>
      student.studentId.toString().includes(query)
    );
    return filteredStudents;
  };

  return (
    <div>
      <h1>{subjectObject?.name}</h1>
      <Divider plain>Subject Details</Divider>
      <div className={classes.subjectInfo}>
        <LabelCaption
          label="Total Number of students"
          caption={
            subjectObject &&
            subjectObject?.students.accepted.length +
              subjectObject?.students.pending.length
          }
        />
        <LabelCaption
          label="Pending Students"
          caption={subjectObject?.students.pending.length}
        />
        <LabelCaption
          label="Accepted Students"
          caption={subjectObject?.students.accepted.length}
        />
        <LabelCaption label="Faculty" caption={subjectObject?.faculty} />
        <LabelCaption label="Year" caption={subjectObject?.year} />
        <LabelCaption label="Semester" caption={subjectObject?.semester} />
      </div>
      <Divider plain>Students</Divider>
      <Switch
        style={{
          backgroundColor: activeStudents ? "green" : "orange",
        }}
        checked={activeStudents}
        onChange={(e) => setActiveStudents(e)}
        checkedChildren="Active Students"
        unCheckedChildren="Pending Students"
        className={classes.switch}
      />
      <CustomTable
        loading={isLoading}
        rowKey={(record: any) => record._id}
        columns={
          activeStudents ? columns.filter((e: any) => !e.isSpecial) : columns
        }
        dataSource={filteredData()}
      />
    </div>
  );
};

const styles = {
  acceptBtn: {
    backgroundColor: "#5cb85c",
    textTransform: "none",
    borderRadius: "6px",
    transition: "background-color 1s",
    "&:hover": { bgcolor: "#1b6b30" },
  },
  rejectBtn: {
    backgroundColor: "#B22222",
    textTransform: "none",
    borderRadius: "6px",
    transition: "background-color 1s",
    "&:hover": { bgcolor: "#7a1818" },
  },
};
export default SubjectInfo;
