import { io } from "socket.io-client";
import { useEffect } from "react";
import api from "../../../services/api";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { useState } from "react";
import LectureForm from "../../../components/Forms/LectureForm";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const Home = () => {
  const auth = useAppSelector((state) => state.auth);
  const jsonData = [
    { name: "John Doe", age: 30, city: "New York" },
    { name: "Jane Smith", age: 28, city: "London" },
    { name: "Bob Johnson", age: 35, city: "Sydney" },
  ];
  const convertJsonToExcel = (records: any) => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "data.xlsx");
  };

  return <div>Coming soon...</div>;
};

export default Home;
