import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { Divider, Empty, Switch, Table, Typography } from "antd";
import LabelCaption from "../../../components/LabelCaption/LabelCaption";
import classes from "./SubjectDetails.module.css";
import Button from "../../../components/Buttons/Button";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { acceptStudent } from "../../../store/subjectsSlice/reducers/acceptStudent";
import { rejectStudent } from "../../../store/subjectsSlice/reducers/rejectStudent";
import { TableRowSelection } from "antd/es/table/interface";
import { displayMessage } from "../../../store/messageSlice/message";
import ExcelButton from "../../../components/Buttons/ExcelButton";
import { excel_to_json } from "../../../utils/excel_to_json";

const SubjectInfo = () => {
  const dispatch = useAppDispatch();
  const multipleOperationHandler = async (type: any) => {
    try {
      await Promise.all(
        selectedRows.map(async (studentId) => {
          if (type === "accept") {
            dispatch(acceptStudent({ studentId, subjectId }));
          } else {
            dispatch(rejectStudent({ studentId, subjectId }));
          }
          setSelectedRows((prev) => {
            return prev.filter((e: any) => e === studentId);
          });
        })
      );
      dispatch(
        displayMessage({
          type: "success",
          context: "Success",
          duration: 5,
        })
      );
    } catch (err: any) {
      dispatch(
        displayMessage({
          type: "error",
          duration: 7,
          context: err.response.data.message
            ? err.response.data.message
            : "Something went wrong",
        })
      );
    }
  };

  const params = useParams();
  const subjectId = params.subjectId;
  interface studentData {
    _id: string;
    name: string;
    email: string;
    semester: string;
    academicYear: string;
    studentId: Number;
    faculty: string;
  }
  const [activeStudents, setActiveStudents] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
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
      title:
        selectedRows.length > 0 ? (
          <Button
            buttonConfigProps={{
              onClick: multipleOperationHandler.bind(this, "accept"),
            }}
            sxStyles={styles.acceptBtn}
            buttonLabel="Accept Selected Students"
          />
        ) : (
          ""
        ),
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
      title:
        selectedRows.length > 0 ? (
          <Button
            buttonConfigProps={{
              onClick: multipleOperationHandler.bind(this, "reject"),
            }}
            sxStyles={styles.rejectBtn}
            buttonLabel="Reject Selected Students"
          />
        ) : (
          ""
        ),
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

  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRows(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<studentData> = {
    selectedRowKeys: selectedRows,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
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

  const uploadFileHandler = async (event: any) => {
    const file = event.target.files[0];
    try {
      const jsonData = await excel_to_json(file);
      const importedStudentRowKeys = subjectObject.students.pending.filter(
        (student: any) => {
          return jsonData.some((e: any) => {
            return e.studentId === student.studentId;
          });
        }
      );
      const ImportedSelectedRows: any = [];
      importedStudentRowKeys.forEach((e: any) => {
        ImportedSelectedRows.push(e._id);
      });
      setSelectedRows(ImportedSelectedRows);
    } catch (err) {
      dispatch(
        displayMessage({
          type: "error",
          duration: 5,
          context: "Something went wrong while trying to upload the file",
        })
      );
    }
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
      <ExcelButton
        onUpload={uploadFileHandler}
        className={classes.excelBtn}
        type="import"
      />
      <Divider></Divider>
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
        tableConfigProps={{
          rowSelection: activeStudents ? undefined : rowSelection,
        }}
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
