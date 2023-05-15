import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const acceptStudent = createAsyncThunk(
  "subject/acceptStudent",
  async (args: any, ThunkAPI) => {
    const state: any = ThunkAPI.getState();
    const studentId = args.studentId;
    const subjectId = args.subjectId;
    await api.post(
      "admin/acceptStudent",
      {
        subjectId,
        studentId,
      },
      {
        headers: {
          Authorization: `Bearer ${state.auth.token}`,
        },
      }
    );
    return { studentId, subjectId };
  }
);
