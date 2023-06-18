import { Button, Input, Modal, Table, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import React, { useState } from "react";
import CustomTable from "../components/CustomTable/CustomTable";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import classes from "./InstructorAssignTable.module.css";
import api from "../services/apis/api";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { displayMessage } from "../store/messageSlice/message";

interface InstructorData {
  _id: string;
  name: string;
  email: string;
  numOfFaculties: number;
  numOfSubjects: number;
}
interface InstructorAssignTableProps {
  dataSource?: any;
  assignType?: String;
  modalOpen?: any;
  closeModal?: any;
  tableLoading?: any;
  refreshInstructors?: any;
  onFinishSelecting?: any;
}

const InstructorAssignTable: React.FC<InstructorAssignTableProps> = ({
  dataSource,
  assignType,
  closeModal,
  modalOpen,
  tableLoading,
  refreshInstructors,
  onFinishSelecting,
}) => {
  const dispatch = useAppDispatch();
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingInstructor, setIsAddingInstructor] = useState(false);
  const auth = useAppSelector((state) => state.auth);
  const columns: ColumnsType<InstructorData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filteredValue: [searchQuery],
      onFilter: (value: any, record: any) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Assigned Faculties",
      dataIndex: "numberOfFaculties",
      key: "numberOfFaculties",
    },
    {
      title: "Assigned Subjects",
      dataIndex: "numOfSubjects",
      key: "numOfSubjects",
    },
  ];

  const onSelectChange = (newSelectedRowKeys: any) => {
    setSelectedRows(newSelectedRowKeys);
  };

  const assignInstructorHandler = async () => {
    const endpoint = "/admin/addInstructor";
    if (assignType === "faculty") {
      setIsAddingInstructor(true);
      try {
        await Promise.all(
          selectedRows.map(async (instructorId) => {
            const response = await api.post(
              endpoint,
              { instructorId },
              { headers: { Authorization: `Bearer ${auth.token}` } }
            );
            dispatch(
              displayMessage({
                type: "success",
                context: response.data.message,
                duration: 5,
              })
            );
          })
        );
        refreshInstructors();
      } catch (err: any) {
        dispatch(
          displayMessage({
            type: "error",
            duration: 7,
            context: err.response.data.message
              ? err.response.data.message
              : "Something went wrong while trying to add instructors",
          })
        );
      }
      setIsAddingInstructor(false);
    } else {
      onFinishSelecting("assign", selectedRows);
      setSelectedRows([]);
    }
    closeModal();
  };

  const rowSelection: TableRowSelection<InstructorData> = {
    selectedRowKeys: selectedRows,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  return (
    <>
      <Modal
        bodyStyle={{
          maxHeight: "80vh",
          overflowY: "scroll",
        }}
        style={{
          top: "25px",
        }}
        onCancel={closeModal}
        width={"100%"}
        footer={[
          <Button key="back" onClick={closeModal}>
            Return
          </Button>,
          <Button
            loading={isAddingInstructor}
            onClick={assignInstructorHandler}
            key="submit"
            type="primary"
          >
            Submit
          </Button>,
        ]}
        className={classes.modal}
        open={modalOpen}
      >
        <SectionTitle
          className={classes.title}
          sectionTitle={
            assignType === "faculty"
              ? "Add Instructor to the faculty"
              : "Assign Instructor to this subject"
          }
        />
        <Input.Search
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchQuery(e.target.value);
          }}
          size="large"
          className={classes.searchBar}
          placeholder="Search for instructor"
          onSearch={(value) => setSearchQuery(value)}
        />
        <CustomTable
          loading={tableLoading}
          pageSize={8}
          tableConfigProps={{
            rowSelection: rowSelection,
          }}
          rowKey={"_id"}
          columns={columns}
          dataSource={dataSource}
        />
      </Modal>
    </>
  );
};

export default InstructorAssignTable;
