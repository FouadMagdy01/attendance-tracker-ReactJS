import React, { useEffect, useState } from "react";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import classes from "./ManageSubjects.module.css";
import { Button, Input, Modal } from "antd";
import Dropdown from "../../../components/Input/Dropdown";
import Card from "../../../components/Cards/Card";
import api from "../../../services/apis/api";
import AddSubjectForm from "../../../components/Forms/SubjectForm";
import { displayMessage } from "../../../store/messageSlice/message";
import { semesterOptions, yearsOptions } from "../../../constants/options";
const ManageSubjects = () => {
  const [filters, setFilters] = useState({
    searchQuery: "",
    year: "All",
    semester: "All",
  });
  const dispatch = useAppDispatch();
  const [subjectModal, setSubjectModal] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAppSelector((state) => state.auth);

  const getSubjects = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/admin/subjects", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setSubjects(response.data);
    } catch (err) {}
    setIsLoading(false);
  };

  const addSubjectHandler = async (formData: any) => {
    console.log(formData);
    await api.put("/admin/add-subject", formData, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });
    dispatch(
      displayMessage({
        type: "success",
        context: "Subject was created successfully",
        duration: 5,
      })
    );
    await getSubjects();
    closeModal();
  };

  const openModal = () => {
    setSubjectModal(true);
  };
  const closeModal = () => {
    setSubjectModal(false);
  };
  useEffect(() => {
    getSubjects();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filteredValue: [filters.searchQuery],
      onFilter(value: any, record: any) {
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Semester",
      dataIndex: "semester",
      key: "semester",
    },
    {
      title: "year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Total Students",
      dataIndex: "totalStudents",
      key: "totalStudents",
      sorter: (a: any, b: any) => a.totalStudents - b.totalStudents,
    },
    {
      title: <p className={classes.pending}>pending</p>,
      className: classes.pending,
      dataIndex: "pending",
      key: "pending",
      color: "red",
      sorter: (a: any, b: any) => a.pending - b.pending,
    },
    {
      title: <p className={classes.accepted}>accepted</p>,
      className: classes.accepted,
      dataIndex: "accepted",
      key: "accepted",
      sorter: (a: any, b: any) => a.accepted - b.accepted,
    },

    {
      title: "More Info",
      dataIndex: "",
      key: "",
      render: (_: any, subject: any) => (
        <>
          <Link to={`/subjects/${subject._id}`}>Subject Details</Link>
        </>
      ),
    },
  ];

  const changeFiltersInputs = (
    filterIdentifier: any,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters((prev) => {
      return {
        ...prev,
        [filterIdentifier]: event.target.value,
      };
    });
  };

  const handleFilteringData = (subjectsData: any) => {
    let dataToFilter = subjectsData;
    console.log(dataToFilter);
    if (filters.year != "All") {
      dataToFilter = dataToFilter.filter((subject: any) => {
        return subject.year.includes(filters.year);
      });
    }
    if (filters.semester != "All") {
      dataToFilter = dataToFilter.filter((subject: any) => {
        return subject.semester.includes(filters.semester);
      });
    }
    return dataToFilter;
  };
  return (
    <div>
      <Modal
        onCancel={closeModal}
        open={subjectModal}
        footer={[<Button onClick={closeModal}>Cancel</Button>]}
      >
        <AddSubjectForm
          onSubmit={addSubjectHandler}
          formWrapperProps={{
            className: classes.addSubjectForm,
          }}
        />
      </Modal>
      <div className="container mx-auto">
        <h1 className="mb-3">Manage Subjects</h1>
        <Card
          defaultProps={{
            onClick: openModal,
          }}
          classNames={classes.addSubject}
        >
          <AiOutlinePlus className={classes.plusIcon} />
          <p className={classes.addSubjectText}>Add Subject</p>
        </Card>
        <div>
          <Input.Search
            size="large"
            value={filters.searchQuery}
            onChange={changeFiltersInputs.bind(this, "searchQuery")}
            className={classes.searchBar}
            placeholder="Search for a subject"
          />
          <div className={classes.filterSection}>
            <Dropdown
              dropdownItems={[
                {
                  label: "All",
                  value: "All",
                },
                ...yearsOptions,
              ]}
              dropdownLabel="Filter by year"
              selectConfigProps={{
                value: filters.year,
                onChange: changeFiltersInputs.bind(this, "year"),
              }}
              formControlConfigProps={{
                sx: {
                  width: "45%",
                  mb: "10px",
                  mr: "10px",
                },
              }}
            />
            <Dropdown
              dropdownItems={[
                {
                  label: "All",
                  value: "All",
                },
                ...semesterOptions,
              ]}
              selectConfigProps={{
                value: filters.semester,
                onChange: changeFiltersInputs.bind(this, "semester"),
              }}
              dropdownLabel="Filter by semester"
              formControlConfigProps={{
                sx: {
                  width: "45%",
                  mb: "10px",
                },
              }}
            />
          </div>
          <CustomTable
            rowKey={"_id"}
            columns={columns}
            dataSource={handleFilteringData(subjects)}
            loading={isLoading}
            pageSize={8}
          />
        </div>
      </div>
    </div>
  );
};

export default ManageSubjects;
