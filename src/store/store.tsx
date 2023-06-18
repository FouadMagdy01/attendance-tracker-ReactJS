import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/auth";
import subjectReducer from "./subjectsSlice/subjectSlice";
import messageReducer from "./messageSlice/message";
import instructorSubjectReducer from "./instructorSubjectSlice/instructorSubject";
import studentReducer from "./studentSlice/student";
import studentsReducer from "./studentsSlice/students";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    subject: subjectReducer,
    message: messageReducer,
    instructorSubject: instructorSubjectReducer,
    student: studentReducer,
    students: studentsReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
