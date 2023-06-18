import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/AdminPages/Home/Home";
import ManageSubjects from "../pages/AdminPages/ManageSubjects/ManageSubjects";
import ManageStudents from "../pages/AdminPages/ManageStudents/ManageStudents";
import Instructors from "../pages/AdminPages/Instructors/Instructors";
import FacultyInfo from "../pages/AdminPages/FacultyInfo/FacultyInfo";
import AdminSideBar from "../layout/AdminSideBar";
import SubjectDetails from "../pages/AdminPages/SubjectDetails/SubjectDetails";
import StudentDetails from "../pages/AdminPages/StudentDetails/StudentDetails";

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
        <Route path="/Subjects/:subjectId" element={<SubjectDetails />} />
        <Route path="/students/:studentId" element={<StudentDetails />} />
      </Routes>
    </AdminSideBar>
  );
};

export default DashboardNavigator;
