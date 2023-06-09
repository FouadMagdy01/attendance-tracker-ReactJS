import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/apis/api";

export const getSubjectAttendance = createAsyncThunk(
  "instructorSubject/attendance",
  async (args: any, ThunkAPI) => {
    const state: any = ThunkAPI.getState();
    const { subjectId, type } = args;
    try {
      const response = await api.get(
        `instructor/subjects/${subjectId}/attendance`,
        {
          params: {
            type: type ? type : undefined,
          },
          headers: {
            Authorization: `Bearer ${state.auth.token}`,
          },
        }
      );
      return response.data;
    } catch (err: any) {
      return err.data.message ? err.data.message : "Something went wrong";
    }
  }
);
