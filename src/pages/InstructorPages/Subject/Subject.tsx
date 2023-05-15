import { Tabs, TabsProps } from "antd";
import { useParams } from "react-router-dom";
import Info from "./Info";
import Lectures from "./Lectures";
import Attendance from "./Attendance";

const Subject: React.FC = () => {
  const params = useParams();
  const subjectId = params.subjectId;
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
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Subject;
