import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/reduxHooks";
import api from "../../../services/apis/api";
import { Button, Result } from "antd";
import { Link, useNavigate } from "react-router-dom";
import LoadingOverlay from "../../../UI/LoadingOverlay";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Card from "../../../components/Cards/Card";
import classes from "./Dashboard.module.css";
import { ReactComponent as FacultySvg } from "../../../assets/svg/faculty.svg";
import { ReactComponent as SubjectSvg } from "../../../assets/svg/Subject.svg";
import LabelCaption from "../../../components/LabelCaption/LabelCaption";

const Dashboard = () => {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [dashboardFeed, setDashboardFeed] = useState<any>(null);
  const [loading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const getDashboardFeed = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/instructor/dashboard", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setErr(false);
      setDashboardFeed(response.data);
    } catch (err) {
      setErr(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getDashboardFeed();
  }, []);
  return (
    <>
      {loading && <LoadingOverlay loadingDesc="Fetching dashboard data" />}
      {err && (
        <Result
          status="500"
          title="500"
          subTitle="Server error"
          extra={
            <Button
              onClick={() => {
                navigate("/Home");
              }}
              type="primary"
            >
              Back Home
            </Button>
          }
        />
      )}
      {dashboardFeed && (
        <>
          <SectionTitle sectionTitle="My Faculties" />
          <div className={classes.faculties}>
            {dashboardFeed.faculties.map((faculty: any) => {
              return (
                <Card key={faculty} classNames={classes.facultyCard}>
                  <FacultySvg />
                  <p className={classes.facultyText}>{faculty}</p>
                  <Link
                    className={classes.manageButton}
                    to={`/faculties/${faculty}`}
                  >
                    Manage
                  </Link>
                </Card>
              );
            })}
          </div>
          <SectionTitle sectionTitle="My Subjects" />
          <div className={classes.subjects}>
            {dashboardFeed.subjects.map((subject: any) => {
              return (
                <Card
                  defaultProps={{
                    onClick: () => {
                      navigate(`/Subjects/${subject._id}`);
                    },
                  }}
                  key={subject._id}
                  classNames={classes.subjectCard}
                >
                  <p className={classes.subjectName}>{subject.name}</p>
                  <p className={classes.facultyName}>{subject.faculty}</p>
                  <SubjectSvg className={classes.subjectLogo} />
                  <LabelCaption label="Year" caption={subject.year} />
                  <LabelCaption
                    label="total Students"
                    caption={subject.totalStudents}
                  />
                  <LabelCaption
                    label="Active Students"
                    caption={subject.activeStudents}
                  />
                  <LabelCaption
                    label="Pending Students"
                    caption={subject.pendingStudents}
                  />
                  <LabelCaption
                    label="Total Lectures"
                    caption={subject.numOfLectures}
                  />
                </Card>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
