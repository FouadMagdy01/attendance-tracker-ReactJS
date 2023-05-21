import { useEffect, useState } from "react";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import api from "../../../services/api";
import { useAppSelector } from "../../../hooks/reduxHooks";

const ManageStudents = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Academic Year",
      dataIndex: "academicYear",
      key: "academicYear",
    },

    {
      title: "Number of subjects",
      dataIndex: "registeredSubjects",
      key: "registeredSubjects",
      sorter: (a: any, b: any) => a.registeredSubjects - b.registeredSubjects,
    },
    {
      title: "More Info",
      dataIndex: "",
      key: "",
      render: (_: any, student: any) => (
        <>
          <Link to={`/student/${student._id}`}>Student Profile</Link>
        </>
      ),
    },
  ];
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const getStudents = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/admin/students", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setStudents(response.data);
    } catch (err) {}
    setIsLoading(false);
  };

  useEffect(() => {
    getStudents();
  }, []);
  return (
    <div>
      <h1>Manage Students</h1>
      <Divider plain>Faculty students</Divider>
      <CustomTable
        rowKey={"_id"}
        loading={isLoading}
        columns={columns}
        dataSource={students}
      />
    </div>
  );
};

export default ManageStudents;
