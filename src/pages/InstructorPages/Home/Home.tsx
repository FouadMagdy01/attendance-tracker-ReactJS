import { useEffect } from "react";
import api from "../../../services/apis/api";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { useState } from "react";
import UpcomingLectureCard from "../../../components/Cards/UpcomingLectureCard";
import classes from "./Home.module.css";
import { Divider } from "antd";
const Home = () => {
  const auth = useAppSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const getUpcomingLectures = async () => {
    const response = await api.get("/instructor/lectures", {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    console.log(response.data);
    setData(response.data);
  };

  useEffect(() => {
    getUpcomingLectures();
  }, []);
  return (
    <>
      <h1 className={classes.lecturesHeader}>Welcome Back!</h1>
      <Divider></Divider>
      <h2>Upcoming Lectures</h2>
      <div className={classes.lecturesContainer}>
        {data.map((item: any) => {
          return <UpcomingLectureCard lectureData={item} />;
        })}
      </div>
    </>
  );
};

export default Home;
