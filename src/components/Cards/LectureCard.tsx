import { Divider } from "antd";
import { ReactComponent as LectureSvg } from "../../assets/svg/Lecture.svg";
import Card from "./Card";
import classes from "./LectureCard.module.css";
import LabelCaption from "../LabelCaption/LabelCaption";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { BiCategoryAlt } from "react-icons/bi";
import { ImStatsDots } from "react-icons/im";
import { AiTwotoneCalendar } from "react-icons/ai";
import SectionTitle from "../SectionTitle/SectionTitle";
import dayjs from "dayjs";
interface LectureCardProps {
  lectureData?: any;
  onClick?: any;
}

const LectureCard: React.FC<LectureCardProps> = ({ lectureData, onClick }) => {
  return (
    <Card
      defaultProps={{
        onClick: onClick,
      }}
      classNames={
        lectureData.finished ? classes.upcomingCard : classes.finishedCard
      }
    >
      <SectionTitle sectionTitle={lectureData.name} />
      <LectureSvg className={classes.icon} />
      <Divider orientation="center">Lecture Details</Divider>
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
          <BsFillPersonVcardFill className={classes.detailsIcon} />
          <LabelCaption
            label="Total Attendees"
            caption={lectureData.numOfAttendees}
          />
        </div>
        <div className={classes.detailsItem}>
          <ImStatsDots className={classes.detailsIcon} />
          <LabelCaption
            label="Presence percentage"
            caption={
              lectureData.finished
                ? lectureData.presencePercentage + "%"
                : "N/A"
            }
          />
        </div>
        <div className={classes.detailsItem}>
          <AiTwotoneCalendar className={classes.detailsIcon} />
          <LabelCaption
            label="Date"
            caption={dayjs(lectureData.date).format("YYYY/mm/dd HH:mm A")}
          />
        </div>
      </div>
    </Card>
  );
};

export default LectureCard;
