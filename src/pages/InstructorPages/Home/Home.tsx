import { useEffect } from "react";
import api from "../../../services/apis/api";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { useState } from "react";
import UpcomingLectureCard from "../../../components/Cards/UpcomingLectureCard";
import classes from "./Home.module.css";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../../UI/LoadingOverlay";
const Home = () => {
  const auth = useAppSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getUpcomingLectures = async () => {
    setLoading(true);
    const response = await api.get("/instructor/lectures", {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getUpcomingLectures();
  }, []);
  if (loading) {
    return <LoadingOverlay loadingDesc="Fetching data" />;
  }
  return (
    <>
      <h1 className={classes.lecturesHeader}>Welcome Back!</h1>
      <Divider></Divider>
      <h2>Upcoming Lectures</h2>
      <div className={classes.lecturesContainer}>
        {data.map((item: any) => {
          return (
            <UpcomingLectureCard
              key={item._id}
              lectureData={item}
              defaultProps={{
                onClick: () => {
                  navigate(`/lectures/${item._id}`);
                },
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default Home;
