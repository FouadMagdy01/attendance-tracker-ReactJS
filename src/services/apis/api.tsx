import axios from "axios";

const api = axios.create({
  baseURL: "https://universityattendance.herokuapp.com",
});

export default api;
