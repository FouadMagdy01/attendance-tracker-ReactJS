import { Tabs, TabsProps } from "antd";
import LectureForm from "../../../components/LectureForm";

const Lectures: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `All lectures`,
      children: "All lectures",
    },
    {
      key: "2",
      label: `Schedule a lecture`,
      children: <LectureForm />,
    },
  ];
  return (
    <div>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default Lectures;
