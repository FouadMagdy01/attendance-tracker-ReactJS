import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/auth";
import subjectReducer from "./subjectsSlice/subjectSlice";
import messageReducer from "./messageSlice/message";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    subject: subjectReducer,
    message: messageReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
