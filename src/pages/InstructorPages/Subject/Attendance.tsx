import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import api from "../../../services/api";
import { useParams } from "react-router-dom";
import classes from "./Attendance.module.css";
import CustomTable from "../../../components/CustomTable/CustomTable";
import jsonToExcel from "../../../utils/json_to_excel_download";
import { getSubjectAttendance } from "../../../store/instructorSubjectSlice/reducers/getSubjectAttendance";
import ExcelButton from "../../../components/Buttons/ExcelButton";
import { Radio, RadioChangeEvent } from "antd";
import LoadingOverlay from "../../../UI/LoadingOverlay";
import CalculateButton from "../../../components/Buttons/CalculateBtn";
const Attendance: React.FC = () => {
  const dispatch = useAppDispatch();
  const { attendance, fetchingAttendance, info } = useAppSelector(
    (state) => state.instructorSubject
  );

  const columns = [
    {
      title: "Name",
      key: "name",
      render: (_: any, record: any) => record.studentDetails.name,
    },

    {
      title: "Student ID",
      key: "studentId",
      render: (_: any, record: any) => record.studentDetails.studentId,
    },
    {
      title: "Year",
      key: "year",
      render: (_: any, record: any) => record.studentDetails.academicYear,
    },
    {
      title: "Email",
      key: "email",
      render: (_: any, record: any) => record.studentDetails.email,
    },
    {
      title: "Lectures attended",
      key: "year",
      render: (_: any, record: any) => record.lecturesAttended,
    },
  ];
  const params = useParams();

  const [value, setValue] = useState("All");

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    if (e.target.value === "All") {
      return dispatch(getSubjectAttendance({ subjectId: params.subjectId }));
    }
    dispatch(
      getSubjectAttendance({
        subjectId: params.subjectId,
        type: e.target.value,
      })
    );
  };

  const downloadExcelSheet = (records: any, fileName: any) => {
    const data = records.map((record: any) => {
      return {
        name: record.studentDetails.name,
        student_ID: record.studentDetails.studentId,
        email: record.studentDetails.email,
        year: record.studentDetails.academicYear,
        total_Attendance: record.lecturesAttended,
      };
    });
    jsonToExcel(data, fileName);
  };

  useEffect(() => {
    dispatch(getSubjectAttendance({ subjectId: params.subjectId }));
  }, []);

  if (fetchingAttendance) {
    return <LoadingOverlay loadingDesc="Fetching Attendance" />;
  }
  return (
    <div>
      <div className={classes.topSection}>
        <ExcelButton
          defaultProps={{
            onClick: () => {
              const fileName = info.name + "_" + "Attendance";
              downloadExcelSheet(attendance.students, fileName);
            },
          }}
          className={classes.attendanceBtn}
          type="export"
        />
        <CalculateButton
          className={classes.attendanceBtn}
          title="Calculate attendance marks"
        />
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={"All"}>All</Radio>
          <Radio value={"Lecture"}>Lectures</Radio>
          <Radio value={"Section"}>Sections</Radio>
        </Radio.Group>
      </div>

      <CustomTable
        rowKey={(record: any) => record.studentDetails._id}
        dataSource={attendance.students}
        columns={columns}
      />
    </div>
  );
};

export default Attendance;
