import { io } from "socket.io-client";
import { useEffect } from "react";
import api from "../../services/api";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useState } from "react";
import LectureForm from "../../components/LectureForm";

const Home = () => {
  const auth = useAppSelector((state) => state.auth);
  //   const socket = io("http://localhost:8080/instructor/attendance");

  //   useEffect(() => {
  //     socket.on("connection", () => {
  //       console.log("connected");
  //     });

  //     socket.on("new attendee", (data) => {
  //       console.log("document edited", data);
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  return (
    <div>
      <LectureForm />
    </div>
  );
};

export default Home;
