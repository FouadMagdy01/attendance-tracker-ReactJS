import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/AdminPages/Home";
import ManageSubjects from "../pages/AdminPages/ManageSubjects";
import ManageStudents from "../pages/AdminPages/ManageStudents";
import Instructors from "../pages/AdminPages/Instructors";
import FacultyInfo from "../pages/AdminPages/FacultyInfo";
import AdminSideBar from "../layout/AdminSideBar";
import SubjectDetails from "../pages/AdminPages/SubjectDetails/SubjectDetails";

const DashboardNavigator = () => {
  return (
    <AdminSideBar>
      <Routes>
        <Route path="*" element={<Navigate to="Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Subjects" element={<ManageSubjects />} />
        <Route path="/Students" element={<ManageStudents />} />
        <Route path="/Instructors" element={<Instructors />} />
        <Route path="/info" element={<FacultyInfo />} />
        <Route path="/Subject/:id" element={<SubjectDetails />} />
      </Routes>
    </AdminSideBar>
  );
};

export default DashboardNavigator;
