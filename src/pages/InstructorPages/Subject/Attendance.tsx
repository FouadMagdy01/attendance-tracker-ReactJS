import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useParams } from "react-router-dom";
import classes from "./Attendance.module.css";
import CustomTable from "../../../components/CustomTable/CustomTable";
import jsonToExcel from "../../../utils/json_to_excel_download";
import { getSubjectAttendance } from "../../../store/instructorSubjectSlice/reducers/getSubjectAttendance";
import ExcelButton from "../../../components/Buttons/ExcelButton";
import { Alert, Modal, Radio, RadioChangeEvent } from "antd";
import LoadingOverlay from "../../../UI/LoadingOverlay";
import CalculateButton from "../../../components/Buttons/CalculateBtn";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Input from "../../../components/Input/Input";
const Attendance: React.FC = () => {
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [attendanceMarks, setAttendanceMarks] = useState({
    lecture: 0,
    section: 0,
  });
  const [attendanceType, setAttendanceType] = useState("All");
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
    {
      title: "Status",
      key: "",
      render: (_: any, record: any) => {
        return record.status === "Warning" ? (
          <Alert type="warning" message="Warning" showIcon />
        ) : (
          <Alert type="success" message="Good" showIcon />
        );
      },
    },
  ];
  const params = useParams();

  const changeAttendanceMarks = (
    inputIdentifier: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isNaN(parseInt(event.target.value))) {
      return;
    }
    setAttendanceMarks((prev) => {
      return {
        ...prev,
        [inputIdentifier]: parseInt(event.target.value),
      };
    });
  };
  const onChange = (e: RadioChangeEvent) => {
    setAttendanceType(e.target.value);
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

  const calculateMarksAndDownload = () => {
    let attendanceData;
    const fileName = info.name + "_" + "Attendance with marks";
    let totalMarksForAttendance;
    let totalLectures = attendance.totalCount;
    let marksForEveryAttendance: any;
    switch (attendanceType) {
      case "All":
        totalMarksForAttendance =
          attendanceMarks.section + attendanceMarks.lecture;
        marksForEveryAttendance = totalMarksForAttendance / totalLectures;
        break;
      case "Section":
        totalMarksForAttendance = attendanceMarks.section;
        marksForEveryAttendance = totalMarksForAttendance / totalLectures;
        break;
      case "Lecture":
        totalMarksForAttendance = attendanceMarks.lecture;
        marksForEveryAttendance = totalMarksForAttendance / totalLectures;
    }
    attendanceData = attendance.students.map((record: any) => {
      return {
        name: record.studentDetails.name,
        student_ID: record.studentDetails.studentId,
        email: record.studentDetails.email,
        year: record.studentDetails.academicYear,
        total_Attendance: record.lecturesAttended,
        attendance_Marks: record.lecturesAttended * marksForEveryAttendance,
      };
    });
    jsonToExcel(attendanceData, fileName);
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

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    dispatch(getSubjectAttendance({ subjectId: params.subjectId }));
  }, []);

  let data = attendance.students ? attendance.students : [];

  console.log(data);
  if (fetchingAttendance) {
    return <LoadingOverlay loadingDesc="Fetching Attendance" />;
  }
  return (
    <div>
      <Modal
        bodyStyle={{
          padding: "10px 0",
        }}
        footer={null}
        open={modalOpen}
        onCancel={closeModal}
        onOk={closeModal}
      >
        {attendanceType === "All" && (
          <>
            <Input
              sxStyles={styles.input}
              inputConfigProps={{
                label: "Total marks for lectures attendance",
                type: "number",
                value: attendanceMarks.lecture,
                onChange: changeAttendanceMarks.bind(this, "lecture"),
                inputProps: {
                  min: "0",
                },
              }}
            />
            <Input
              sxStyles={styles.input}
              inputConfigProps={{
                label: "Total marks for section attendance",
                type: "number",
                value: attendanceMarks.section,
                onChange: changeAttendanceMarks.bind(this, "section"),
                inputProps: {
                  min: "0",
                },
              }}
            />
          </>
        )}
        {attendanceType === "Lecture" && (
          <>
            <Input
              sxStyles={styles.input}
              inputConfigProps={{
                label: "Total marks for lectures attendance",
                value: attendanceMarks.lecture,
                onChange: changeAttendanceMarks.bind(this, "lecture"),
                inputProps: {
                  min: "0",
                },
              }}
            />
          </>
        )}
        {attendanceType === "Section" && (
          <>
            <Input
              sxStyles={styles.input}
              inputConfigProps={{
                value: attendanceMarks.section,
                onChange: changeAttendanceMarks.bind(this, "section"),
                label: "Total marks for section attendance",
                inputProps: {
                  min: "0",
                },
              }}
            />
          </>
        )}
        <ExcelButton
          defaultProps={{
            onClick: calculateMarksAndDownload,
          }}
          additionalText="Calculate and "
          type="export"
        />
      </Modal>
      <SectionTitle sectionTitle={`Total Count: ${attendance?.totalCount}`} />
      <div className={classes.topSection}>
        <ExcelButton
          defaultProps={{
            onClick: () => {
              const fileName = info.name + "_" + "Attendance";
              downloadExcelSheet(data, fileName);
            },
          }}
          className={classes.attendanceBtn}
          type="export"
        />
        <CalculateButton
          defaultProps={{
            onClick: openModal,
          }}
          className={classes.attendanceBtn}
          title="Calculate attendance marks"
        />
        <Radio.Group onChange={onChange} value={attendanceType}>
          <Radio value={"All"}>All</Radio>
          <Radio value={"Lecture"}>Lectures</Radio>
          <Radio value={"Section"}>Sections</Radio>
        </Radio.Group>
      </div>

      <CustomTable
        rowKey={(record: any) => record.studentDetails._id}
        dataSource={data}
        columns={columns}
      />
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    margin: "10px 0",
  },
};
export default Attendance;
