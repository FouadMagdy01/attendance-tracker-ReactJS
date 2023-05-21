import { Tabs, TabsProps } from "antd";
import { useParams } from "react-router-dom";
import Info from "./Info";
import Lectures from "./Lectures";
import Attendance from "./Attendance";
import { useEffect } from "react";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { resetInstructorSubjectData } from "../../../store/instructorSubjectSlice/instructorSubject";
const Subject: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Subject Info`,
      children: <Info />,
    },
    {
      key: "2",
      label: `Lectures`,
      children: <Lectures />,
    },
    {
      key: "3",
      label: `Attendance`,
      children: <Attendance />,
    },
  ];
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(resetInstructorSubjectData({}));
    };
  }, []);
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Subject;
