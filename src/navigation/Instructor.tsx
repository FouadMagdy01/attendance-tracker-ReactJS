import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/InstructorPages/Home";
import InstructorSideBar from "../layout/InstructorSidebar";
import Dashboard from "../pages/InstructorPages/Dashboard";
import Subject from "../pages/InstructorPages/Subject/Subject";

const InstructorsNavigator = () => {
  return (
    <InstructorSideBar>
      <Routes>
        <Route path="*" element={<Navigate to="Home" />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Subjects" element={<Dashboard />} />
        <Route path="/Subject/:subjectId" element={<Subject />} />
      </Routes>
    </InstructorSideBar>
  );
};

export default InstructorsNavigator;
