import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/apis/api";

export const rejectStudent = createAsyncThunk(
  "subject",
  async (args: any, ThunkAPI) => {
    const { studentId, subjectId } = args;
    const state: any = ThunkAPI.getState();
    await api.post(
      "admin/rejectStudent",
      {
        subjectId,
        studentId,
      },
      { headers: { Authorization: `Bearer ${state.auth.token}` } }
    );
    return { studentId, subjectId };
  }
);
