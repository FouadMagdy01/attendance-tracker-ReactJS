import { Tabs, TabsProps } from "antd";
import LectureForm from "../../../components/Forms/LectureForm";
import api from "../../../services/api";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { displayMessage } from "../../../store/messageSlice/message";
import AllLectures from "./AllLectures";
import LoadingOverlay from "../../../UI/LoadingOverlay";
import { useEffect } from "react";
import { getSubjectLectures } from "../../../store/instructorSubjectSlice/reducers/getSubjectLectures";
import { useParams } from "react-router-dom";
import { createLecture } from "../../../store/instructorSubjectSlice/reducers/createLecture";
const Lectures: React.FC = () => {
  const dispatch = useAppDispatch();
  const { fetchingLectures, err, lectures, creatingLecture } = useAppSelector(
    (state) => state.instructorSubject
  );

  const params = useParams();

  const addLectureHandler = async (lectureData: any) => {
    dispatch(createLecture(lectureData));
    dispatch(getSubjectLectures({ subjectId: params.subjectId }));
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `All lectures`,
      children: <AllLectures lectures={lectures} />,
    },
    {
      key: "2",
      label: `Schedule a lecture`,
      children: (
        <LectureForm
          loading={creatingLecture}
          subjectId={params.subjectId}
          onsubmit={addLectureHandler}
        />
      ),
    },
  ];
  useEffect(() => {
    dispatch(getSubjectLectures({ subjectId: params.subjectId }));
  }, []);

  if (fetchingLectures && !err) {
    return <LoadingOverlay loadingDesc="Fetching subject lectures" />;
  }
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Lectures;
