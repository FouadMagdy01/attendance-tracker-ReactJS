import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getStudentData } from "../../../store/studentSlice/reducers/getStudentData";
import LoadingOverlay from "../../../UI/LoadingOverlay";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Divider, Tag } from "antd";
import classes from "./StudentDetails.module.css";
import StudentRegisterForm from "../../../components/Forms/StudentRegisterForm";
import Button from "../../../components/Buttons/Button";
import { styles } from "../../../constants/styles";
import { AiFillEdit } from "react-icons/ai";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { ColumnsType } from "antd/es/table";
import api from "../../../services/apis/api";
import { editStudentData } from "../../../store/studentSlice/reducers/editStudentData";
import { deleteStudent } from "../../../store/studentSlice/reducers/deleteStudent";

interface StudentDetailsProps {}

const StudentDetails: React.FC<StudentDetailsProps> = () => {
  const navigate = useNavigate();
  const params = useParams();
  const columns: ColumnsType = [
    {
      title: "Subject Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
    },
    {
      title: "Register Status",
      dataIndex: "",
      key: "",
      render: (_: any, record: any) => {
        return record.accepted ? (
          <Tag color="success" children={"Active Student"} />
        ) : (
          <Tag color="warning" children={"Pending request"} />
        );
      },
    },
  ];

  const studentId = params.studentId;
  const { studentDetails, loading, isMakingOperation } = useAppSelector(
    (state) => state.student
  );
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStudentData({ studentId }));
  }, []);

  const switchModeHandler = () => {
    setIsEditing(!isEditing);
  };

  const deleteStudentHandler = async () => {
    try {
      dispatch(deleteStudent({ studentId: params.studentId }));
      navigate("/students");
    } catch (err) {}
  };
  const submitFormHandler = async (formData: any) => {
    dispatch(editStudentData({ ...formData, userId: params.studentId }));
  };

  if (loading) {
    return <LoadingOverlay loadingDesc="Fetching Student Details" />;
  }
  return (
    <div>
      <SectionTitle sectionTitle={studentDetails?.name} />
      <Divider>More Info</Divider>
      <StudentRegisterForm
        isLoading={isMakingOperation}
        onSubmit={submitFormHandler}
        defaultValues={studentDetails}
        onCancel={switchModeHandler}
        editable={isEditing}
      />
      {!isEditing && (
        <div className={classes.infoFooter}>
          <Button
            sxStyles={extraStyles.editBtn}
            buttonLabel="Edit Student Info"
            buttonConfigProps={{
              onClick: switchModeHandler,
            }}
          />
          <Button
            sxStyles={extraStyles.deleteBtn}
            buttonLabel="Delete Student"
            buttonConfigProps={{
              onClick: deleteStudentHandler,
              loading: isMakingOperation,
            }}
          />
        </div>
      )}
      <Divider>Student Subjects</Divider>
      <CustomTable
        dataSource={studentDetails.studentSubjects}
        columns={columns}
        loading={loading}
      />
    </div>
  );
};

const extraStyles = {
  editBtn: {
    ...styles.button,
    backgroundColor: "#657ea6",
    "&:hover": {
      backgroundColor: "#304566",
    },
  },
  deleteBtn: {
    ...styles.button,
    backgroundColor: "#bf1f13",
    "&:hover": {
      backgroundColor: "#8a2922",
    },
  },
};
export default StudentDetails;
