import io from "socket.io-client";

const attendanceSocket = io("http://localhost:8080/instructor/attendance");

export default attendanceSocket;
