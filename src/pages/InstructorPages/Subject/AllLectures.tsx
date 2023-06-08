import { useNavigate } from "react-router-dom";
import classes from "./AllLectures.module.css";
import LectureCard from "../../../components/Cards/LectureCard";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Divider, Empty } from "antd";
import { Helmet } from "react-helmet";

interface LecturePropsTypes {
  lectures?: any;
}

const EmptyLectures = () => {
  return (
    <div className={classes.empty}>
      <Empty />
    </div>
  );
};
const AllLectures: React.FC<LecturePropsTypes> = ({ lectures }) => {
  const navigate = useNavigate();
  const upcomingLectures = lectures?.filter((e: any) => !e.finished);
  const finishedLectures = lectures?.filter((e: any) => e.finished);
  return (
    <>
      <Helmet>
        <title></title>
      </Helmet>
      <SectionTitle sectionTitle="Upcoming Lectures" />
      <div className={classes.lecturesWrapper}>
        {upcomingLectures && upcomingLectures.length === 0 && <EmptyLectures />}
        {lectures &&
          upcomingLectures.map((lecture: any) => {
            return (
              <LectureCard
                key={lecture._id}
                onClick={() => {
                  navigate(`/Lectures/${lecture._id}`);
                }}
                lectureData={lecture}
              />
            );
          })}
      </div>
      <Divider> </Divider>
      <SectionTitle sectionTitle="Finished Lectures" />
      <div className={classes.lecturesWrapper}>
        {upcomingLectures && finishedLectures.length === 0 && <EmptyLectures />}
        {lectures &&
          finishedLectures.map((lecture: any) => {
            return (
              <LectureCard
                key={lecture._id}
                onClick={() => {
                  navigate(`/Lectures/${lecture._id}`);
                }}
                lectureData={lecture}
              />
            );
          })}
      </div>
    </>
  );
};

export default AllLectures;
