import { Button, Divider, Modal } from "antd";
import { useState, useEffect, useRef } from "react";
import classes from "./Instructors.module.css";
import Card from "../../../components/Cards/Card";
import { HiUserAdd } from "react-icons/hi";
import { BsFilePersonFill } from "react-icons/bs";
import InstructorAssignTable from "../../../UI/InstructorAssignTable";
import { useAppSelector } from "../../../hooks/reduxHooks";
import api from "../../../services/apis/api";
const Instructors = () => {
  const randomColors = [
    "#DB54FD",
    "#61D26F",
    "#1FAAE9",
    "#4086E0",
    "#7A6FEF",
    "#EEC301",
    "#61D26F",
    "#FD612C",
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [facultyInstructors, setFacultyInstructors] = useState([]);
  const [loading, setLoading] = useState(false);

  const auth = useAppSelector((state) => state.auth);
  const getAllInstructors = async () => {
    if (modalOpen) {
      setLoading(true);
      const response = await api.get("/admin/instructors", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(response.data);
      setInstructors(response.data);
      setLoading(false);
    }
  };

  const getFacultyInstructors = async () => {
    const response = await api.get("/admin/facultyInstructors", {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    setFacultyInstructors(response.data);
    console.log(response.data);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    getFacultyInstructors();
  }, []);

  useEffect(() => {
    getAllInstructors();
  }, [modalOpen]);

  return (
    <div>
      <h1>Manage Instructors</h1>
      <InstructorAssignTable
        refreshInstructors={getFacultyInstructors}
        tableLoading={loading}
        dataSource={instructors}
        assignType="faculty"
        closeModal={closeModal}
        modalOpen={modalOpen}
      />
      <Divider plain>Instructors of the faculty</Divider>
      <div className={classes.facultyInstructors}>
        <Card
          classNames={`${classes.addInstructorCard}`}
          defaultProps={{
            onClick: handleOpenModal,
          }}
        >
          <HiUserAdd className={classes.addInstructorIcon} />
          <p className={classes.cardText}>Add Instructor</p>
        </Card>
        {facultyInstructors.map((item: any, index: any) => {
          return (
            <Card
              key={item._id}
              defaultProps={{
                style: {
                  backgroundColor: randomColors[index % randomColors.length],
                },
              }}
              classNames={classes.instructorCard}
            >
              <BsFilePersonFill className={classes.addInstructorIcon} />
              <p className={classes.cardText}>{item.name}</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Instructors;
