import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/reduxHooks";
import api from "../../../services/apis/api";
import { useState } from "react";
import { useEffect } from "react";
import { Divider } from "antd";
import classes from "./LectureDetails.module.css";
import CountDown from "../../../components/CountDown/CountDoun";
import LoadingOverlay from "../../../UI/LoadingOverlay";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import LabelCaption from "../../../components/LabelCaption/LabelCaption";
import Button from "../../../components/Buttons/Button";
import { Helmet } from "react-helmet";
import { formStyles } from "../../../constants/formStyles";
const LectureDetails = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const [lecture, setLecture] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const getLecture = async () => {
    setLoading(true);
    const response = await api.get(`/instructor/lectures/${params.lectureId}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    setLecture(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getLecture();
  }, []);

  console.log(lecture);
  if (!lecture) {
    return <LoadingOverlay loadingDesc="Fetching lecture data" />;
  }
  return (
    <>
      <Helmet>
        <title>{lecture?.name}</title>
      </Helmet>
      <SectionTitle sectionTitle={lecture?.name} />
      <Divider>Lecture Details</Divider>
      <div className={classes.lectureDetails}>
        <LabelCaption
          label="Faculty"
          caption={lecture.subjectDetails.faculty}
        />
        <LabelCaption label="Year" caption={lecture.subjectDetails.year} />
        <LabelCaption
          label="Subject Name"
          caption={lecture.subjectDetails.name}
        />
        <LabelCaption
          label="Subject Active Students"
          caption={lecture.activeStudents}
        />
        <LabelCaption
          label="Total Available students"
          caption={lecture.availableStudents}
        />
      </div>
      <Divider></Divider>
      {lecture && <CountDown date={lecture.date} />}
      <Divider></Divider>
      <div className={classes.startAttendance}>
        <Button
          sxStyles={{
            textTransform: "none",
            transition: "all 0.5s",
            backgroundColor: "#657ea6",
            "&:hover": {
              backgroundColor: "#304566",
            },
            fontWeight: "600",
            borderRadius: "10px",
            padding: "15px 25px",
            mt: "15px",
          }}
          buttonConfigProps={{
            onClick: () => {
              navigate(`/Attendance/${params.lectureId}`);
            },
          }}
          buttonLabel="Take Attendance"
        />
      </div>
    </>
  );
};

export default LectureDetails;
