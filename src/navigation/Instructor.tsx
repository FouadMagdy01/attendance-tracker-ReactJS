import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/InstructorPages/Home/Home";
import InstructorSideBar from "../layout/InstructorSidebar";
import Dashboard from "../pages/InstructorPages/Dashboard/Dashboard";
import Subject from "../pages/InstructorPages/Subject/Subject";
import LectureDetails from "../pages/InstructorPages/LectureDetails/LectureDetails";
import Attendance from "../pages/InstructorPages/Attendance/Attendance";

const InstructorsNavigator = () => {
  return (
    <InstructorSideBar>
      <Routes>
        <Route path="*" element={<Navigate to="Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Subjects" element={<Dashboard />} />
        <Route path="/Subjects/:subjectId" element={<Subject />} />
        <Route path="/Lectures/:lectureId" element={<LectureDetails />} />
        <Route path="/Attendance/:lectureId" element={<Attendance />} />
      </Routes>
    </InstructorSideBar>
  );
};

export default InstructorsNavigator;
