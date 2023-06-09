import Card from "./Card";
import classes from "./UpcomingLectureCard.module.css";
import { ReactComponent as LectureSvg } from "../../assets/svg/Lecture.svg";
import { Divider } from "antd";
import { BiCategoryAlt } from "react-icons/bi";
import LabelCaption from "../LabelCaption/LabelCaption";
import { ImLocation } from "react-icons/im";
import { AiTwotoneCalendar } from "react-icons/ai";
import dayjs from "dayjs";
import CountDown from "../CountDown/CountDoun";

interface Props {
  lectureData?: any;
}
const UpcomingLectureCard: React.FC<Props> = ({ lectureData }) => {
  return (
    <Card classNames={classes.card}>
      <h2 className={classes.texts}>{lectureData.subject.name}</h2>
      <Divider></Divider>
      <h3 className={classes.texts}>{lectureData.name}</h3>
      <LectureSvg className={classes.icon} />
      <Divider className={classes.texts} orientation="center">
        Lecture Details
      </Divider>
      <div className={classes.lectureDetails}>
        <div className={classes.detailsItem}>
          <BiCategoryAlt className={classes.detailsIcon} />
          <LabelCaption label="Type" caption={lectureData.type} />
        </div>
        <div className={classes.detailsItem}>
          <ImLocation className={classes.detailsIcon} />
          <LabelCaption label="Location" caption={lectureData.location} />
        </div>
        <div className={classes.detailsItem}>
          <AiTwotoneCalendar className={classes.detailsIcon} />
          <LabelCaption
            label="Date"
            caption={dayjs(lectureData.date).format("YYYY/mm/dd HH:mm A")}
          />
        </div>
        <div className={classes.detailsItem}>
          <BiCategoryAlt className={classes.detailsIcon} />
          <LabelCaption label="Faculty" caption={lectureData.subject.faculty} />
        </div>
        <div className={classes.detailsItem}>
          <BiCategoryAlt className={classes.detailsIcon} />
          <LabelCaption label="Year" caption={lectureData.subject.year} />
        </div>
        <div className={classes.detailsItem}>
          <BiCategoryAlt className={classes.detailsIcon} />
          <LabelCaption
            label="Semester"
            caption={lectureData.subject.semester}
          />
        </div>
        <Divider></Divider>
        <CountDown
          digitClassName={classes.digitClassName}
          date={lectureData.date}
        />
      </div>
    </Card>
  );
};
export default UpcomingLectureCard;
