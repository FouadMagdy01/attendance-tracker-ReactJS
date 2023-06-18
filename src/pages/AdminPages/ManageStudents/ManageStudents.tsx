import { useEffect, useState } from "react";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { Link } from "react-router-dom";
import { Divider, Input } from "antd";
import api from "../../../services/apis/api";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import ExcelButton from "../../../components/Buttons/ExcelButton";
import classes from "./ManageStudent.module.css";
import buttonClasses from "../../../components/Buttons/Buttons.module.css";
import { ColumnsType } from "antd/es/table";
import { FaCashRegister } from "react-icons/fa";
import { excel_to_json } from "../../../utils/excel_to_json";
import { displayMessage } from "../../../store/messageSlice/message";
import { registerStudent } from "../../../store/studentsSlice/reducers/registerStudent";

const ManageStudents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useAppDispatch();
  const columns: ColumnsType = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
      filteredValue: [searchQuery],
      onFilter(value: any, record: any) {
        return record.studentId.toString().includes(value.toString());
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Academic Year",
      dataIndex: "academicYear",
      key: "academicYear",
    },

    {
      title: "Number of subjects",
      dataIndex: "registeredSubjects",
      key: "registeredSubjects",
      sorter: (a: any, b: any) => a.registeredSubjects - b.registeredSubjects,
    },
    {
      title: "More Info",
      dataIndex: "",
      key: "",
      render: (_: any, student: any) => (
        <>
          <Link to={`/students/${student._id}`}>Student Profile</Link>
        </>
      ),
    },
  ];
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const getStudents = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/admin/students", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setStudents(response.data);
    } catch (err) {}
    setIsLoading(false);
  };

  const uploadFileHandler = async (event: any) => {
    const file = event.target.files[0];
    try {
      const excelData = await excel_to_json(file);

      const filteredData = excelData.filter((row: any) => {
        const studentIdIsValid = !isNaN(row.studentId);
        const nameIsValid = row.name.length > 3;
        const nationalIdIsValid = row.nationalId.toString().length === 14;
        const yearIsValid = [
          "One",
          "Two",
          "Three",
          "Four",
          "Five",
          "Six",
          "Seven",
        ].includes(row.year.trim());
        const semesterIsValid = ["first", "second"].includes(
          row.semester.trim()
        );
        console.log(
          nameIsValid,
          yearIsValid,
          semesterIsValid,
          nationalIdIsValid,
          studentIdIsValid
        );
        return (
          studentIdIsValid &&
          nameIsValid &&
          nationalIdIsValid &&
          yearIsValid &&
          semesterIsValid
        );
      });
      console.log(filteredData);
      try {
        await Promise.all(
          filteredData.map(async (entry: any) => {
            dispatch(registerStudent(entry));
          })
        );
      } catch (err) {}
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

  useEffect(() => {
    getStudents();
  }, []);
  return (
    <div>
      <h1>Manage Students</h1>
      <div className={classes.buttonsWrapper}>
        <ExcelButton
          onUpload={uploadFileHandler}
          className={classes.excelBtn}
          type="import"
        />
        <div
          className={buttonClasses.calculateBtn + " " + classes.addStudentBtn}
        >
          <FaCashRegister />
          <p className={classes.btnText}>Register Student</p>
        </div>
      </div>
      <Divider plain>Faculty students</Divider>
      <Input.Search
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchQuery(e.target.value);
        }}
        size="large"
        className={classes.searchBar}
        placeholder="Search for instructor"
        onSearch={(value) => setSearchQuery(value)}
      />
      <CustomTable
        rowKey={"_id"}
        loading={isLoading}
        columns={columns}
        dataSource={students}
      />
    </div>
  );
};

export default ManageStudents;
